import { createClient } from "@/lib/supabase/server";

export type Address = {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  addressLine: string;
  district: string | null;
  city: string;
  postalCode: string | null;
  countryCode: string;
  isDefault: boolean;
};

type AddressRow = {
  id: string;
  title: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  address_line: string;
  district: string | null;
  city: string;
  postal_code: string | null;
  country_code: string;
  is_default: boolean;
};

function mapAddress(row: AddressRow): Address {
  return {
    id: row.id,
    title: row.title,
    firstName: row.first_name,
    lastName: row.last_name,
    phone: row.phone,
    addressLine: row.address_line,
    district: row.district,
    city: row.city,
    postalCode: row.postal_code,
    countryCode: row.country_code,
    isDefault: row.is_default,
  };
}

export async function getAddresses(): Promise<Address[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("addresses")
    .select(
      `
      id,
      title,
      first_name,
      last_name,
      phone,
      address_line,
      district,
      city,
      postal_code,
      country_code,
      is_default
    `,
    )
    .order("is_default", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Failed to load addresses");
  }

  return ((data ?? []) as AddressRow[]).map(mapAddress);
}
