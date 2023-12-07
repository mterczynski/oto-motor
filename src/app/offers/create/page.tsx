"use client";

import { useFormStatus, useFormState } from "react-dom";
import { createOffer } from "@/app/actions";
import { SaleOffer } from "@/app/types/saleOffer";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

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

export default function AddForm() {
  const [state, formAction] = useFormState(createOffer, {
    fieldValues: initialFormValue,
  });

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
      />

      <SubmitButton />
    </form>
  );
}
