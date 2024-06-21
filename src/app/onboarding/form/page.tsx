import { Suspense } from "react";
import BookDietForm from './book-diet-form';

export default function Form() {
    return (
      <div className="flex flex-col px-7 py-10">
        <Suspense>
          <BookDietForm />
        </Suspense>
      </div>
    )
}