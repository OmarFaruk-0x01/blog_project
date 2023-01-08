import { debounce } from "@helpers/utils";
import useDebounce from "@hooks/useDebounce";
import Close from "@icons/Close";
import Spin from "@icons/Spin";
import DownArrow from "@icons/DownArrow";
import Badge from "@ui/Badge";
import Button from "@ui/Button";
import TextInput from "@ui/TextInput";
import clsx from "clsx";
import {
  ChangeEvent,
  FC,
  memo,
  MouseEvent,
  MouseEventHandler,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { AutoCompleteProps } from "./AutoComplete.interface";
import { usePopper } from "react-popper";
import useOnClickOutside from "@hooks/useOnClickOutside";

const AutoComplete: <T>(props: AutoCompleteProps<T>) => JSX.Element = ({
  options,
  values: _values,
  value,
  listItemClass,
  textInputClass,
  listContainerClass,
  textInputProps,
  className,
  onItemSelect,
  getOptionLabel,
  getFilterLabel,
  enableCreateNew,
  onCreateNew,
  loading,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [refElement, setRefElement] = useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLUListElement | null>(
    null
  );
  const { styles, attributes, update, forceUpdate } = usePopper(
    refElement,
    popperElement,
    {
      placement: "bottom",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 5],
          },
        },
        {
          name: "preventOverflow",
          options: {
            padding: { right: 20 },
            rootBoundary: "viewport",
          },
        },
      ],
    }
  );
  const [values, setValues] = useState<typeof options[0][]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce(searchText, 300);
  const focus_on = async () => {
    await update?.();
    setIsFocused(true);
  };
  const focus_off = () => {
    console.log("Set to focus false: ");
    setIsFocused(false);
  };

  const handleTextType = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    setSearchText(ev.target.value);
  }, []);

  const _options = useMemo(
    () =>
      debouncedSearchText.length === 0
        ? options
        : debouncedSearchText.length > 0
        ? options.filter((item) => getFilterLabel(item, debouncedSearchText))
        : [],
    [debouncedSearchText, options, getFilterLabel]
  );

  const multi_values = useMemo(() => values.map(getOptionLabel), [values]);
  const handleSelect = useCallback(
    (item: typeof options[0]) => () => {
      onItemSelect?.(item);
      setSearchText("");
      update?.();
      focus_off();
    },
    [onItemSelect]
  );

  const handleMultiSelect = useCallback(
    (item: typeof options[0]) => () => {
      setValues([...values, item]);
      onItemSelect?.([...values, item]);
      setSearchText("");
      update?.();
      focus_off();
    },
    [values]
  );

  const handleMultiSelect_remove = useCallback(
    (item: typeof options[0]) => () => {
      const newValues = values.filter(
        (val) => JSON.stringify(val) !== JSON.stringify(item)
      );
      setValues(newValues);
      onItemSelect?.(newValues);
      focus_off();
    },
    [values]
  );

  const handleContainerClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (ev) => ev.stopPropagation(),
    []
  );

  const handleCreateNew = useCallback(async () => {
    try {
      const item = await onCreateNew?.(searchText);
      if (Boolean(item)) {
        handleMultiSelect(item!);
        options.push(item!);
        setSearchText("");
      }
    } catch (err) {
      console.log(err);
      // toast.error("Something went wrong!")
    }
  }, [searchText]);

  useEffect(() => {
    (async function () {
      await update?.()
    })()
    if (window) {
      window.addEventListener("click", focus_off);

      return () => {
        window.removeEventListener("click", focus_off);
      };
    }
  }, []);

  useEffect(() => {
    if ((_values?.length as number) > 0) {
      setValues(_values!);
    }
  }, [_values]);

  return (
    <div
      ref={setRefElement}
      onClick={handleContainerClick}
      className={clsx(
        "relative flex w-full flex-col items-start justify-start font-siliguri",
        className
      )}
    >
      <div
        className={clsx("flex w-full flex-wrap items-center gap-2 rounded", {
          "border p-2": enableCreateNew,
        })}
      >
        {values?.map((val) => (
          <Badge
            key={JSON.stringify(val)}
            label={getOptionLabel?.(val) as string}
            onClick={handleMultiSelect_remove(val)}
            endIcon={<Close />}
          />
        ))}

        {/* @ts-ignore */}
        <TextInput
          onFocus={focus_on}
          onChange={handleTextType}
          endIcon={
            loading ? (
              <Spin />
            ) : (
              <DownArrow
                className={clsx("transition-transform", {
                  "rotate-180": isFocused,
                })}
              />
            )
          }
          value={
            searchText ||
            (Boolean(value) && (getOptionLabel(value!) as string)) ||
            ""
          }
          containerClass={clsx(textInputClass, "rounded-b-none", {
            "border-none": enableCreateNew,
          })}
          {...textInputProps}
          className={clsx(textInputProps?.className)}
        />
      </div>

      <ul
        ref={setPopperElement}
        className={clsx(
          "absolute top-[100%] left-0 z-dropdown flex max-h-[250px] w-full flex-col gap-1 overflow-y-auto rounded-md rounded-t-none bg-white px-2 py-2 shadow-md transition-all",
          {
            ["invisible translate-y-10 opacity-0 duration-75"]: !isFocused,
            ["visible translate-y-0 opacity-100"]: isFocused,
          },
          listContainerClass
        )}
        style={styles.popper}
        {...attributes.popper}
      >
        {_options.length > 0 ? (
          _options.map((item, index) =>
            multi_values.includes(getOptionLabel?.(item)) && enableCreateNew ? (
              <Button
                variant="success"
                className="text-start"
                onClick={handleMultiSelect_remove(item)}
                active
              >
                {getOptionLabel?.(item)}
              </Button>
            ) : (
              <li
                key={index}
                className={clsx(
                  listItemClass,
                  "cursor-pointer rounded-md p-2 hover:bg-gray-100"
                )}
                onClick={
                  enableCreateNew ? handleMultiSelect(item) : handleSelect(item)
                }
              >
                {getOptionLabel?.(item)}
              </li>
            )
          )
        ) : !enableCreateNew ? (
          <li className={clsx("rounded-md p-2 text-center", listItemClass)}>
            No Options
          </li>
        ) : !!searchText ? (
          <Button
            className="break-all text-start text-sm font-semibold"
            onClick={handleCreateNew}
          >
            Add "{searchText}"
          </Button>
        ) : (
          <li className={clsx("rounded-md p-2 text-center", listItemClass)}>
            No Options
          </li>
        )}
      </ul>
    </div>
  );
};

export default memo(AutoComplete) as typeof AutoComplete;
