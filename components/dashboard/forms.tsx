"use client";

import { FullForm } from "@/types";
import { FormBox } from "@/components/dashboard/form-box";

interface Props {
  forms: FullForm[] | null;
}

export function Forms({ forms }: Props) {
  if (!forms) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {forms.map((form, index) => (
          <FormBox key={index} form={form} />
        ))}
      </div>
    </div>
  );
}
