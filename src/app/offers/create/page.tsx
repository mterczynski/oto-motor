"use client";

import { useFormStatus, useFormState } from "react-dom";
import { createOffer } from "@/app/actions";
import { SaleOffer } from "@/app/types/saleOffer";

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
      <input
        className="text-black"
        type="text"
        name="brand"
        required
        id="input-brand"
      />

      <label htmlFor="input-model" className="text-white">
        Model
      </label>
      <input
        className="text-black"
        type="text"
        name="model"
        required
        id="input-model"
      />

      <label htmlFor="input-mileageInKm" className="text-white">
        Przebieg w km
      </label>
      <input
        className="text-black"
        type="number"
        name="mileageInKm"
        required
        id="input-mileageInKm"
      />

      <label htmlFor="input-price" className="text-white">
        Cena w zł
      </label>
      <input
        className="text-black"
        type="number"
        name="priceInPLN"
        required
        id="input-price"
      />

      <label htmlFor="input-location" className="text-white">
        Lokalizacja
      </label>
      <input
        className="text-black"
        type="text"
        name="location"
        required
        id="input-location"
      />

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
      <input
        className="text-black"
        name="image"
        type="file"
        id="input-image"
        accept="image/*"
      />

      {/* <input type="image" /> */}
      <SubmitButton />
    </form>
  );
}
