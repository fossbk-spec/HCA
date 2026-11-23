import type { Metadata } from "next";
import { BookCard } from "@/components/books/BookCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { listAllBooks } from "@/services/books";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Classic Books & Manuscripts | Tác phẩm & Kinh điển",
  description: "Browse the seminal books, legal codes, epics, and philosophical treatises of human civilization.",
};

export default async function BooksPage() {
  const books = await listAllBooks();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        badgeEn="Knowledge & Literature"
        badgeVi="Tri thức & Văn chương"
        titleEn="Classic Books & Treatises"
        titleVi="Những Tác phẩm & Khảo luận Kinh điển"
        descriptionEn={`Discover ${books.length} transformative texts—from ancient legal codes and sacred scriptures to revolutionary scientific works and national epics.`}
        descriptionVi={`Khám phá ${books.length} kiệt tác bất hủ—từ các bộ luật cổ đại và thánh điển linh thiêng đến các phát kiến khoa học cách mạng và sử thi dân tộc.`}
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <BookCard key={book.slug} book={book} />
        ))}
      </div>
    </div>
  );
}
