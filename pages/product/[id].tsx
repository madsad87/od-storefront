import { useRouter } from "next/router";
import ProductDetail from "@/pages/ProductDetail";

export default function ProductDetailPage() {
  const { query } = useRouter();
  const id = Array.isArray(query.id) ? query.id[0] : query.id;

  if (!id) {
    return null;
  }

  return <ProductDetail identifier={id} />;
}
