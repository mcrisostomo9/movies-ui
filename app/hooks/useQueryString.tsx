import { ReadonlyURLSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useQueryString(searchParams: ReadonlyURLSearchParams) {
  const createQueryString = useCallback(
    (name: string, value: string, deleteKey?: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      if (deleteKey) {
        params.delete(deleteKey);
      }

      return params.toString();
    },
    [searchParams],
  );

  return { createQueryString };
}
