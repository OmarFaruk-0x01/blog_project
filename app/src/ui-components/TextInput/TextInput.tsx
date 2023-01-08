import type { TextInputProps } from "./TextInput.interface";
import {
  ChangeEvent,
  forwardRef,
  memo,
  useState,
  useEffect,
  useCallback,
} from "react";
import clsx from "clsx";
import useDebounce from "@hooks/useDebounce";
import { useDebouncedCallback } from "use-debounce";

const INPUT_DELAY = 300;

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      className,
      endIcon,
      startIcon,
      containerClass,
      iconClass,
      id,
      label,
      enableForm,
      name,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [innerValue, setInnerValue] = useState("");

    useEffect(() => {
      if (value) {
        setInnerValue(value as string);
      } else {
        setInnerValue("");
      }
    }, [value, id]);

    const debouncedHandleOnChange = useDebouncedCallback((event) => {
      if (onChange) {
        onChange?.(event);
      }
    }, INPUT_DELAY);

    const handleOnChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        event.persist();

        const newValue = event.currentTarget.value;
        setInnerValue(newValue);
        debouncedHandleOnChange(event);
      },
      [id]
    );

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id || ""}
            className="font-siliguri text-sm font-medium text-gray-500"
          >
            {label}
          </label>
        )}
        <div
          className={clsx(
            containerClass,
            "flex w-full items-center justify-start gap-2 rounded border bg-white px-2"
          )}
        >
          {Boolean(startIcon) && (
            <div className={clsx(iconClass)}>{startIcon}</div>
          )}
          <input
            ref={ref}
            id={id}
            name={name}
            className={clsx(
              className,
              "text-md text-md h-full w-full border-none py-2 outline-none "
            )}
            {...props}
            value={innerValue}
            onChange={handleOnChange}
          />
          {Boolean(endIcon) && <div className={clsx(iconClass)}>{endIcon}</div>}
        </div>
      </div>
    );
  }
);

export default memo(TextInput);
