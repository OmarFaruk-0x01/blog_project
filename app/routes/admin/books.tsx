import type { Book, Images } from "@prisma/client";
import {
  createBooks,
  deleteBooks,
  getBooks,
  getBooksPrivate,
  updateBooks,
} from "@/models/books.server";
import {
  getSession,
  requireUserId,
  sessionStorage,
  setToast,
} from "@/session.server";
import Add from "@icons/Add";
import Delete from "@icons/Delete";
import Edit from "@icons/Edit";
import {
  Form,
  useActionData,
  useFetcher,
  useLoaderData,
  useSubmit,
} from "@remix-run/react";
import { json, LoaderArgs, ActionArgs } from "@remix-run/server-runtime";
import Button from "@ui/Button";
import TextInput from "@ui/TextInput";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { ChangeEvent, useEffect, useState } from "react";
import { slugify } from "@helpers/utils";
import BooksItem from "@components/BooksItem";
import DownArrow from "@icons/DownArrow";
import ImageFilePlus from "@icons/ImageFilePlus";
import TextArea from "@ui/TextArea";
import { FileResponse } from "@interfaces/models/file";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import Spin from "@icons/Spin";
import Close from "@icons/Close";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  try {
    const books = await getBooksPrivate();
    return json({
      books,
    });
  } catch (err) {
    return json(null);
  }
};

type ActionDataType = {
  status: "success" | "failed";
  error: {
    field: string;
    message: string;
  } | null;
};

export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);
  const session = await getSession(request);
  const formData = await request.formData();
  const resp: ActionDataType = {
    status: "success",
    error: null,
  };
  const bookData: Omit<Book, "id" | "createdAt" | "updatedAt"> = {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    author: formData.get("author") as string,
    description: formData.get("description") as string,
    pages: formData.get("pages") as string,
    preview_url: formData.get("preview_url") as string,
    publication: formData.get("publication") as string,
    published: formData.get("published") as string,
  };

  // @ts-ignore
  const thumbnail = JSON.parse(formData.get("thumbnail") as string) as Images;

  console.log(bookData);

  const bookId = formData.get("bookId") as string;

  if (!!!bookData.title && request.method.toLowerCase() !== "delete") {
    setToast({ session, message: "Book title is required", type: "error" });
    return json(null, {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    });
  }

  if (!!!bookData.slug && request.method.toLowerCase() !== "delete") {
    setToast({ session, message: "Book slug is required", type: "error" });
    return json(null, {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    });
  }

  if (!!!bookData.published && request.method.toLowerCase() !== "delete") {
    setToast({
      session,
      message: "Book Published Date is required",
      type: "error",
    });
    return json(null, {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    });
  }

  if (!!!bookId && request.method.toLowerCase() === "delete") {
    setToast({ session, message: "Book id is required", type: "error" });
    return json(null, {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    });
  }

  try {
    switch (request.method.toLowerCase()) {
      case "delete": {
        const deletedBook = await deleteBooks({ id: bookId });
        setToast({
          session,
          message: `"${bookData.title}" is deleted successfully.`,
          type: "success",
        });
        return json(resp, {
          headers: {
            "Set-Cookie": await sessionStorage.commitSession(session),
          },
        });
      }
      case "post": {
        const newBook = await createBooks({ ...bookData, thumbnail });
        console.log(newBook);
        setToast({
          session,
          message: `"${bookData.title}" added successfully.`,
          type: "success",
        });
        return json(resp, {
          headers: {
            "Set-Cookie": await sessionStorage.commitSession(session),
          },
        });
      }
      case "patch": {
        if (!bookId) {
          resp.status = "failed";
          setToast({
            session,
            message: `Book Id not found.`,
            type: "error",
          });
          return json(resp, {
            headers: {
              "Set-Cookie": await sessionStorage.commitSession(session),
            },
          });
        }
        const book = await updateBooks({ ...bookData, thumbnail }, bookId);
        setToast({
          session,
          message: `"${book.title}" update successfully.`,
          type: "success",
        });
        return json(resp, {
          headers: {
            "Set-Cookie": await sessionStorage.commitSession(session),
          },
        });
      }
      default: {
        return json(null);
      }
    }
  } catch (err) {
    console.log(err);
    resp.status = "failed";
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        console.log(err.meta);
        if ((err?.meta?.target as string[])?.includes?.("slug")) {
          resp.error = {
            field: "slug",
            message: `${bookData.title} is already exists`,
          };
          setToast({
            session,
            message: `"${bookData.title}" slug is already exists`,
            type: "error",
          });
          return json(null, {
            headers: {
              "Set-Cookie": await sessionStorage.commitSession(session),
            },
          });
        } else if ((err?.meta?.target as string[])?.includes?.("title")) {
          resp.error = {
            field: "slug",
            message: `"${bookData.title}" slug is already exists`,
          };
          setToast({
            session,
            message: `${bookData.title} book is already exists`,
            type: "error",
          });
          return json(null, {
            headers: {
              "Set-Cookie": await sessionStorage.commitSession(session),
            },
          });
        }
      }
    }
    return json(resp);
  }
};

const Books = () => {
  const submit = useSubmit();
  const fetcher = useFetcher<FileResponse>();
  const actionData = useActionData<typeof action>();
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [uploadedFileId, setUploadedFileId] = useState<string>("");
  const data = useLoaderData<typeof loader>();
  const formik = useFormik<Omit<Book, "id" | "createdAt" | "updatedAt">>({
    initialValues: {
      author: "",
      description: "",
      pages: "",
      preview_url: "",
      publication: "",
      published: "",
      slug: "",
      title: "",
    },
    onSubmit(values, formikHelpers) {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (typeof value === "string") {
          formData.append(key, value);
        } else {
          formData.append(key, JSON.stringify(value));
        }
      });
      submit(formData, { method: "post" });
    },
  });
  const books = data?.books || [];

  const handleFileChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    if (ev.target.files?.length! > 0) {
      const file = ev.target.files?.item(0)!;
      const blobUrl = URL.createObjectURL(file);
      setSelectedFile(blobUrl);
      formData.append("img", file);
      fetcher.submit(formData, {
        action: "/api/file",
        method: "post",
        encType: "multipart/form-data",
        replace: false,
      });
    }
    return;
  };
  const handleDelete = () => {
    const formData = new FormData();
    if (!!uploadedFileId) {
      formData.append("id", uploadedFileId);
      fetcher.submit(formData, { method: "delete", action: "/api/file" });
      return;
    }
  };
  const handleSlug = (ev: ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue("slug", slugify(ev.target.value));
  };

  const handleTitle = (ev: ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue("title", ev.target.value);
    formik.setFieldValue("slug", slugify(ev.target.value));
  };

  useEffect(() => {
    if (actionData?.status === "success") {
      formik.resetForm();
      setSelectedFile("");
      setUploadedFileId("");
    }
  }, [actionData]);

  useEffect(() => {
    if (fetcher.data?.status === "success") {
      toast.success(fetcher.data.message);
      setSelectedFile(fetcher?.data?.data?.imgSrc || "");
      formik.setFieldValue("thumbnail", {
        src: fetcher?.data?.data?.imgSrc,
        publicId: fetcher?.data?.data?.imgId,
      });
      setUploadedFileId(fetcher?.data?.data?.imgId || "");
    } else if (fetcher.data?.status === "failed") {
      setSelectedFile("");
      setUploadedFileId("");
      toast.error(fetcher.data?.error.message || "Something went wrong");
    }
  }, [fetcher.data]);

  return (
    <div className="w-full font-siliguri">
      <Form method="post" className="">
        <h4 className="mb-5 text-xl font-bold">Add Book</h4>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-[auto_1fr]">
          <div className="group/thumb relative flex h-[300px] w-[200px] items-center justify-center rounded bg-gray-50 transition-colors hover:bg-gray-100">
            {!!selectedFile ? (
              <div className="relative z-30 h-full w-full">
                {fetcher.state === "submitting" ? (
                  <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] rounded-lg bg-white p-5 text-lg text-primary shadow-md">
                    <Spin />
                  </div>
                ) : uploadedFileId ? (
                  <div className="absolute inset-0 top-0 left-0 z-20 flex cursor-pointer items-center justify-center bg-black/25 opacity-0 transition-opacity group-hover/thumb:opacity-100">
                    <Button className="z-20" onClick={handleDelete}>
                      <Close />
                    </Button>
                  </div>
                ) : (
                  <div className="absolute inset-0 top-0 left-0 z-20 flex cursor-pointer items-center justify-center bg-black/25 opacity-0 transition-opacity group-hover/thumb:opacity-100">
                    <Button className="z-20">Change Image</Button>
                  </div>
                )}

                <img
                  className="absolute inset-0 -z-10 h-full w-full rounded"
                  src={selectedFile}
                  alt="book"
                />
              </div>
            ) : (
              <Button className="z-10 !bg-white">
                <ImageFilePlus />
              </Button>
            )}

            {!uploadedFileId && (
              <input
                type="file"
                onChange={handleFileChange}
                className="absolute inset-0 z-10 cursor-pointer opacity-0"
              />
            )}
          </div>
          <div className="flex w-full flex-col  gap-3">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
              <TextInput
                label="বইয়ের নাম"
                placeholder="বস্তুবাদের মুখোশ উন্মোচন"
                name="title"
                onChange={handleTitle}
                value={formik.values.title}
              />
              <TextInput
                label="Slug"
                placeholder="bastubader mukhos unmochon"
                name="slug"
                onChange={handleSlug}
                value={formik.values.slug}
              />
              <TextInput
                label="সংস্করণ"
                type="date"
                name="published"
                onChange={formik.handleChange}
                value={``}
              />
            </div>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
              <TextInput
                label="বইয়ের পাতা সংখ্যা"
                type="number"
                placeholder="১৭৬"
                name="pages"
                onChange={formik.handleChange}
                value={formik.values.pages + ""}
              />
              <TextInput
                label="লেখকের নাম"
                placeholder="তাফাজ্জুল হক"
                name="author"
                onChange={formik.handleChange}
                value={formik.values.author}
              />
              <TextInput
                label="প্রকাশনীর নাম"
                placeholder="ফাতিহ প্রকাশন"
                name="publication"
                onChange={formik.handleChange}
                value={formik.values.publication}
              />
            </div>
            <TextArea
              label="বিস্তারিত"
              name="description"
              placeholder="পাশ্চাত্যের বস্তুবাদী সভ্যতা রবের সাথে মানুষের সম্পর্ককে বিচ্ছিন্ন করে দিয়েছে।......"
              onChange={formik.handleChange}
              value={formik.values.description || ""}
            ></TextArea>

            <Button
              startIcon={<Add />}
              onClick={(ev) => {
                ev.preventDefault();
                formik.handleSubmit();
              }}
            >
              Add
            </Button>
          </div>
        </div>
      </Form>
      <div className="mt-5">
        <h4 className="text-xl font-bold">List Books</h4>
        <div className="mt-2">
          <div className="grid grid-cols-[auto_1fr_auto_auto] font-semibold text-gray-400">
            <div className="h-[50px] w-[50px] items-center justify-center p-2">
              SL.
            </div>
            <div className="p-2">Book</div>
            <div className="h-[50px] w-[100px] p-2">Posts</div>
            <div className="h-[50px] w-[120px] p-2"></div>
          </div>
          <hr />
          {books.map(({ updatedAt, createdAt, ...book }, index) => (
            <BooksItem
              key={book.id}
              book={{
                ...book,
                createdAt: new Date(createdAt),
                updatedAt: new Date(updatedAt),
              }}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Books;
