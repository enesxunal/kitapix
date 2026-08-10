"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { Address } from "@/lib/data/addresses";
import {
  createAddress,
  deleteAddress,
  setDefaultAddress,
  updateAddress,
  type AddressActionState,
} from "@/lib/addresses/actions";

type AddressesManagerProps = {
  addresses: Address[];
};

const initialState: AddressActionState = {};

function AddressFields({
  address,
  idPrefix,
}: {
  address?: Address;
  idPrefix: string;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Input
        id={`${idPrefix}-title`}
        name="title"
        label="Başlık"
        required
        defaultValue={address?.title ?? ""}
        placeholder="Ev, İş..."
      />
      <Input
        id={`${idPrefix}-phone`}
        name="phone"
        label="Telefon"
        defaultValue={address?.phone ?? ""}
        placeholder="+90 5xx xxx xx xx"
      />
      <Input
        id={`${idPrefix}-first-name`}
        name="first_name"
        label="Ad"
        required
        defaultValue={address?.firstName ?? ""}
      />
      <Input
        id={`${idPrefix}-last-name`}
        name="last_name"
        label="Soyad"
        required
        defaultValue={address?.lastName ?? ""}
      />
      <div className="sm:col-span-2">
        <Input
          id={`${idPrefix}-address-line`}
          name="address_line"
          label="Adres"
          required
          defaultValue={address?.addressLine ?? ""}
        />
      </div>
      <Input
        id={`${idPrefix}-district`}
        name="district"
        label="İlçe"
        defaultValue={address?.district ?? ""}
      />
      <Input
        id={`${idPrefix}-city`}
        name="city"
        label="Şehir"
        required
        defaultValue={address?.city ?? ""}
      />
      <Input
        id={`${idPrefix}-postal-code`}
        name="postal_code"
        label="Posta kodu"
        defaultValue={address?.postalCode ?? ""}
      />
      <Input
        id={`${idPrefix}-country-code`}
        name="country_code"
        label="Ülke kodu"
        defaultValue={address?.countryCode ?? "TR"}
      />
      <label className="flex items-center gap-2 text-body-small text-foreground sm:col-span-2">
        <input
          type="checkbox"
          name="is_default"
          defaultChecked={address?.isDefault ?? false}
          className="size-4 rounded border-border"
        />
        Varsayılan adres yap
      </label>
    </div>
  );
}

function CreateAddressForm({ onDone }: { onDone: () => void }) {
  const [state, formAction, pending] = useActionState(
    async (prev: AddressActionState, formData: FormData) => {
      const result = await createAddress(prev, formData);
      if (!result.error) {
        onDone();
      }
      return result;
    },
    initialState,
  );

  return (
    <form
      action={formAction}
      className="rounded-large border border-border bg-surface p-5 sm:p-6"
    >
      <h3 className="text-body font-semibold text-foreground">Yeni Adres</h3>
      {state.error ? (
        <p role="alert" className="mt-3 text-body-small text-danger">
          {state.error}
        </p>
      ) : null}
      <div className="mt-4">
        <AddressFields idPrefix="new-address" />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button type="submit" variant="primary" size="sm" disabled={pending}>
          {pending ? "Kaydediliyor..." : "Adresi Kaydet"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onDone}
          disabled={pending}
        >
          Vazgeç
        </Button>
      </div>
    </form>
  );
}

function EditAddressForm({
  address,
  onDone,
}: {
  address: Address;
  onDone: () => void;
}) {
  const [state, formAction, pending] = useActionState(
    async (prev: AddressActionState, formData: FormData) => {
      const result = await updateAddress(prev, formData);
      if (!result.error) {
        onDone();
      }
      return result;
    },
    initialState,
  );

  return (
    <form action={formAction} className="mt-4 space-y-4">
      <input type="hidden" name="address_id" value={address.id} />
      {state.error ? (
        <p role="alert" className="text-body-small text-danger">
          {state.error}
        </p>
      ) : null}
      <AddressFields address={address} idPrefix={`edit-${address.id}`} />
      <div className="flex flex-wrap gap-2">
        <Button type="submit" variant="primary" size="sm" disabled={pending}>
          {pending ? "Kaydediliyor..." : "Kaydet"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onDone}
          disabled={pending}
        >
          Vazgeç
        </Button>
      </div>
    </form>
  );
}

function AddressCard({ address }: { address: Address }) {
  const [editing, setEditing] = useState(false);
  const fullName = `${address.firstName} ${address.lastName}`.trim();
  const line2 = [address.district, address.city].filter(Boolean).join(" / ");

  return (
    <article className="flex h-full flex-col rounded-large border border-border bg-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-body font-semibold text-foreground">
          {address.title}
        </h3>
        {address.isDefault ? (
          <span className="inline-flex rounded-medium border border-accent/40 bg-accent-soft px-2.5 py-1 text-caption font-medium text-foreground">
            Varsayılan
          </span>
        ) : null}
      </div>

      {editing ? (
        <EditAddressForm address={address} onDone={() => setEditing(false)} />
      ) : (
        <>
          <div className="mt-4 space-y-1 text-body text-foreground">
            <p className="font-medium">{fullName}</p>
            <p className="text-muted">{address.addressLine}</p>
            {line2 ? <p className="text-muted">{line2}</p> : null}
            {address.postalCode ? (
              <p className="text-muted">{address.postalCode}</p>
            ) : null}
          </div>

          {address.phone ? (
            <p className="mt-3 text-body-small text-muted">
              <span className="sr-only">Telefon: </span>
              {address.phone}
            </p>
          ) : null}

          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            {!address.isDefault ? (
              <form action={setDefaultAddress}>
                <input type="hidden" name="address_id" value={address.id} />
                <Button type="submit" variant="secondary" size="sm">
                  Varsayılan Yap
                </Button>
              </form>
            ) : null}
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setEditing(true)}
            >
              Düzenle
            </Button>
            <form action={deleteAddress}>
              <input type="hidden" name="address_id" value={address.id} />
              <Button type="submit" variant="ghost" size="sm">
                Sil
              </Button>
            </form>
          </div>
        </>
      )}
    </article>
  );
}

export function AddressesManager({ addresses }: AddressesManagerProps) {
  const [showCreate, setShowCreate] = useState(false);
  const isEmpty = addresses.length === 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {!showCreate ? (
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={() => setShowCreate(true)}
          >
            Yeni Adres Ekle
          </Button>
        ) : null}
      </div>

      {showCreate ? (
        <CreateAddressForm onDone={() => setShowCreate(false)} />
      ) : null}

      {isEmpty && !showCreate ? (
        <section
          aria-labelledby="addresses-empty-heading"
          className="rounded-large border border-border bg-surface px-6 py-12 text-center"
        >
          <h2 id="addresses-empty-heading" className="text-h3 text-foreground">
            Henüz kayıtlı adresin yok.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-body text-muted">
            Siparişlerini daha hızlı tamamlamak için teslimat adresi
            ekleyebilirsin.
          </p>
          <div className="mt-6">
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={() => setShowCreate(true)}
            >
              Adres Ekle
            </Button>
          </div>
        </section>
      ) : null}

      {!isEmpty ? (
        <section aria-labelledby="addresses-list-heading">
          <h2 id="addresses-list-heading" className="sr-only">
            Kayıtlı adresler
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {addresses.map((address) => (
              <li key={address.id}>
                <AddressCard address={address} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
