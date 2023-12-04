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
    <button type="submit" aria-disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}

export default function AddForm() {
  const [state, formAction] = useFormState(createOffer, {
    fieldValues: initialFormValue,
  });

  return (
    <form action={formAction}>
      <label htmlFor="input-brand" className="text-white">
        Marka
      </label>
      <input
        className="text-black"
        type="text"
        id="input-brand"
        name="brand"
        required
      />

      <label htmlFor="input-mileageInKm" className="text-white">
        Przebieg w km
      </label>
      <input
        className="text-black"
        type="number"
        id="input-mileageInKm"
        name="mileageInKm"
        required
      />

      <label htmlFor="input-model" className="text-white">
        Model
      </label>
      <input
        className="text-black"
        type="text"
        id="input-model"
        name="model"
        required
      />

      <label htmlFor="input-price" className="text-white">
        Cena w zł
      </label>
      <input
        className="text-black"
        type="number"
        id="input-priceInPLN"
        name="priceInPLN"
        required
      />

      <label htmlFor="input-location" className="text-white">
        Lokalizacja
      </label>
      <input
        className="text-black"
        type="text"
        id="input-location"
        name="location"
        required
      />

      <label htmlFor="input-description" className="text-white">
        Opis
      </label>
      <input
        className="text-black"
        type="text"
        id="input-description"
        name="description"
      />

      {/* <input type="image" /> */}
      <SubmitButton />
    </form>
  );
}
