"use client";

import { createOffer } from "@/app/actions";
import { offerImageSize } from "@/app/globals";
import { SaleOffer } from "@/app/types/saleOffer";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { useFormState, useFormStatus } from "react-dom";

export type CreateSaleOfferFormData = Pick<
  SaleOffer,
  "brand" | "description" | "location" | "mileageInKm" | "model" | "priceInPLN"
>;

const initialFormValue: CreateSaleOfferFormData = {
  brand: "",
  description: "",
  location: "",
  mileageInKm: 0,
  model: "",
  priceInPLN: 0,
};

function Input(
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) {
  return <input className="text-black" {...props} />;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="bg-green-500 mt-4" aria-disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}

export default function AddForm({
  params: { lang },
}: {
  params: { lang: unknown };
}) {
  const [state, formAction] = useFormState(createOffer, {
    fieldValues: initialFormValue,
  });
  const { push } = useRouter();
  const [selectedImage, setSelectedImage] = useState<File>();
  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target?.files && target?.files.length > 0) {
      setSelectedImage(target?.files[0]);
    }
  };

  useEffect(() => {
    if (state?.message === "success") {
      const offerId = (state.fieldValues as any).id;
      const redirectUrl = offerId ? `/offers?offerId=${offerId}` : "/";
      push(redirectUrl);
    }
  }, [state, push]);

  return (
    <form action={formAction} className="flex flex-col">
      <label htmlFor="input-brand" className="text-white">
        Marka
      </label>
      <Input type="text" name="brand" required id="input-brand" />

      <label htmlFor="input-model" className="text-white">
        Model
      </label>
      <Input type="text" name="model" required id="input-model" />

      <label htmlFor="input-mileageInKm" className="text-white">
        Przebieg w km
      </label>
      <Input type="number" name="mileageInKm" required id="input-mileageInKm" />

      <label htmlFor="input-price" className="text-white">
        Cena w zł
      </label>
      <Input type="number" name="priceInPLN" required id="input-price" />

      <label htmlFor="input-location" className="text-white">
        Lokalizacja
      </label>
      <Input type="text" name="location" required id="input-location" />

      <label htmlFor="input-description" className="text-white">
        Opis
      </label>
      <textarea
        className="text-black"
        name="description"
        rows={10}
        id="input-description"
      />

      <label htmlFor="input-image" className="text-white">
        Załącz zdjęcie
      </label>
      <Input
        name="image"
        type="file"
        id="input-image"
        accept="image/*"
        required
        onChange={onImageChange}
      />
      {selectedImage && (
        <Image
          src={URL.createObjectURL(selectedImage)}
          width={offerImageSize.width}
          height={offerImageSize.height}
          alt=""
        />
      )}

      <SubmitButton />
    </form>
  );
}
