# BookVerse Phase 2 — Viva Guide

Only concepts from the syllabus are used: `fetch` and loading/error/retry, pagination, Context API, components, props, `useState`, `useEffect` (once, in Toast), controlled forms, validation, conditional rendering, modals, toasts, `filter()` / `sort()`, `localStorage`, React Router.

**Shared idea — how React updates the screen:** when `setSomething(...)` is called, React re-runs the component function and redraws whatever changed. Every feature below is "user does something → state changes → React redraws".

---

## Feature 1 — Add Book form and validation

**What it does:** Checks every field when the user clicks *Add Book*. Wrong fields get a red border and a message under them. A valid form saves the book, clears the form and shows a success toast.

**Files:** `src/pages/AddBook.jsx` (rewritten inside, same page/route), new `src/components/FormInput.jsx` (reusable input), `src/pages/AddBook.css` (error styles), `src/App.jsx` (passes `currentUser`).

**Concepts:** `useState`, controlled inputs, `onChange`, `onSubmit`, `event.preventDefault()`, `if` validation, conditional rendering (`{errors.title && ...}`), props and a reusable component (`FormInput`), `useContext` (to get `showToast`).

**Functions:**
- `handleChange` – runs on every keystroke, copies the typed value into `formData`, and removes that field's old error.
- `validateForm` – checks each field with `if` statements and returns an object such as `{ title: "Title is required." }`.
- `handleSubmit` – calls `validateForm`; if any errors exist it shows them and stops (`return`); otherwise it saves the book.

**Key lines:**
```jsx
const [formData, setFormData] = useState(emptyForm);   // what the user typed
const [errors, setErrors] = useState({});              // messages to show
```
```jsx
setFormData((prev) => ({ ...prev, [id]: value }));
```
Keeps the old values (`...prev`) and replaces only the field whose `id` matches the input (`[id]: value`).
```jsx
if (formData.title.trim() === "") { newErrors.title = "Title is required."; }
```
`trim()` removes spaces, so a title of only spaces becomes `""` and is rejected.
```jsx
if (Object.keys(newErrors).length > 0) { setErrors(newErrors); showToast(...); return; }
```
`Object.keys(newErrors).length` counts the problems. `return` ends the function before anything is saved.
```jsx
{errors.title && <p className="field-error">{errors.title}</p>}
```
Shows the message only if one exists.
```jsx
setFormData(emptyForm);
```
Putting the empty values back clears the form (works because inputs are controlled).
`addedBy: currentUser.email` stores who added the book (used by the dashboard).
**Reusable input — `FormInput`:** instead of repeating label + input + error message for every field, one small component does it. The page passes props:
```jsx
<FormInput id="title" label="Title" type="text"
  value={formData.title} onChange={handleChange} error={errors.title} />
```
Inside, it draws the `<label>`, the `<input value={value} onChange={onChange}>` and shows `error` only if it exists. The state stays in `AddBook`; `FormInput` only displays what it is given.

`<form noValidate>` switches off the browser's own pop-up messages so ours are shown.

**Data flow:** type → `handleChange` → `formData` updates → input redraws. Submit → `preventDefault` → `validateForm` → errors? show them : `addUserBook` → saved in `localStorage` → `setFormData(emptyForm)` → toast.

**Viva questions**
1. *What is a controlled input?* An input whose `value` comes from state and which updates that state in `onChange`, so React always knows what is typed.
2. *Why `e.preventDefault()`?* A form normally reloads the page on submit; this stops that so React can handle it.
3. *How does validation stop bad data?* `handleSubmit` returns early when `validateForm` finds errors, so `addUserBook` is never reached.
4. *Why `Number(price)`?* Inputs always give text; we convert to a number to check `< 0` and to store a real number.
5. *Why `trim()`?* To reject values that contain only spaces.
6. *Why a reusable `FormInput`?* To avoid repeating the same label, input and error code for every field; props make each copy different.

**Demo:** Click *Add Book* on an empty form (errors appear) → enter title `   ` (still rejected) → price `-5` (rejected) → fill correctly → toast appears, form empties → open Catalogue and find the book.

**Common mistakes:** forgetting `preventDefault` (page reloads); `id` not matching the `formData` key (input does nothing); forgetting `value=` on an input (not controlled); forgetting `return` after showing errors (invalid book still saved).

---

## Feature 2 — Toast notifications and delete confirmation

**What it does:** Short messages for adding a book, deleting a book, wishlist add/remove and failed validation. Deleting now asks first with a Cancel / Delete box.

**Files:** `utils/bookManagement.js` (`deleteBook`, `getAllBooks`); new `components/Toast.jsx` + `Toast.css`; new `context/ToastContext.js` and `context/ToastProvider.jsx`; `main.jsx` (wraps the app in the provider); `components/DeleteBookButton.jsx` + new `DeleteBookButton.css`; `components/WishlistButton.jsx`; `pages/BookDetails.jsx`; `pages/AddBook.jsx`.

**Concepts:** Context API (`createContext`, Provider, `useContext`), global vs local state, conditional rendering, `useEffect` (timer).

**Functions:**
- `showToast(message, type)` in `ToastProvider` – stores the message in `toast` state.
- `closeToast()` – sets `toast` back to `null`.
- `Toast` – shows the message and hides it after 3 seconds.
- `handleConfirmDelete` – runs only when the user presses *Delete* in the box.

**Key lines:**
```jsx
export const ToastContext = createContext(null);                 // the shared box
<ToastContext.Provider value={{ showToast }}> ... </ToastContext.Provider>
const { showToast } = useContext(ToastContext);                  // in any component
```
The toast is **global state**: `ToastProvider` wraps the whole app in `main.jsx` and owns the `toast` state, so any component can call `showToast` without props being passed through every level. The toast is drawn by the provider (not by a page), so it stays visible even if the page changes. Form fields, `showConfirm` and `sortOption` stay **local state** because only one component needs them.
```jsx
useEffect(() => {
  const timer = setTimeout(onClose, 3000);
  return () => clearTimeout(timer);
}, [message, onClose]);
```
After the toast appears, start a 3-second timer that calls `onClose`. The returned function cancels the timer if the toast disappears sooner. (The ✕ button also closes it manually.)
```jsx
const [showConfirm, setShowConfirm] = useState(false);
{showConfirm && ( ...modal... )}
```
The box is drawn only while `showConfirm` is `true`. *Cancel* sets it to `false` and nothing is deleted.

**Data flow:** click Delete Book → `showConfirm = true` → box appears → *Delete* → `deleteUserBook` (removes from `localStorage`) → `onDeleted` → `BookDetails` calls `showToast` and navigates to the catalogue → toast shows there.

**Delete any book (CRUD – Delete):** every book on the Book Details page now has a Delete button. Two cases:
- A book the user added is removed from `localStorage` (`deleteUserBook`, as before).
- A built-in book lives in the fixed file `books.js`, which the app cannot edit. So we save its id in a list `bookverse_deleted_book_ids` in `localStorage` and **hide** books whose id is in that list.

`getAllBooks()` in `utils/bookManagement.js` joins the built-in and user books and removes the hidden ones. Home, Catalogue, Book Details, Wishlist and Profile all use it, so a deleted book disappears everywhere and the Profile counts update.
```js
return allBooks.filter((book) => !deletedIds.includes(book.id));
```
**Limits:** there is no "undo" button (clearing the browser's site data brings the built-in books back); online books from Load More cannot be deleted because they are not saved, and they vanish when you leave the page; anyone using this browser can delete, because there is no backend.

**Viva questions**
1. *Why is toast state in a Context?* Many unrelated components (AddBook, WishlistButton, BookDetails) need it; Context shares it without passing props through every level.
2. *What do Provider and `useContext` do?* The Provider makes a value available to everything inside it; `useContext` reads that value.
3. *Why `useEffect` here?* The timer is a side effect that must start after the toast is drawn.
4. *Why the cleanup `return`?* To cancel the timer so it does not run after the toast is gone.
5. *What does `{showConfirm && ...}` do?* Conditional rendering: draws the box only when true.
6. *How can you delete a book from `books.js`?* We cannot change that file at run time, so we store the deleted ids in `localStorage` and filter those books out with `filter()`.

**Demo:** Open a book you added → Delete Book → Cancel (book stays) → Delete Book → Delete → "Book deleted successfully." toast. Add/remove a wishlist item to show those toasts.

**Common mistakes:** using `useContext(ToastContext)` in a component that is not inside `ToastProvider` (gives `null`, so `showToast` is undefined); forgetting to wrap `<App />` with `<ToastProvider>` in `main.jsx`.

---

## Feature 3 — Catalogue search, filter and sort

**What it does:** Search (title or author, any letter case), category buttons, and a new *Sort by* dropdown (Default, Title A–Z, Price Low→High, Price High→Low). All three work together.

**Files:** `pages/Books.jsx`, `pages/Books.css`. (`SearchBar`, `CategoryFilter`, `BookGrid` were already correct and are unchanged.)

**Concepts:** `useState`, controlled `<select>`, `filter()`, `sort()`, copying arrays, conditional rendering (empty message already in `BookGrid`).

**Key lines:**
```jsx
const [sortOption, setSortOption] = useState('default');
```
```jsx
const term = searchTerm.trim().toLowerCase();
book.title.toLowerCase().includes(term)
```
Lower-casing both sides makes the search case-insensitive. An empty `term` matches every book because every string includes `""`.
```jsx
const sortedBooks = [...filteredBooks];
sortedBooks.sort((a, b) => a.price - b.price);
```
`[...x]` makes a copy so the original list keeps its order. `sort` with `a - b` puts smaller prices first; `b - a` reverses it. Titles use `a.title.localeCompare(b.title)`.

**Order of work:** `allBooks` → `filter` (search + category) → copy and `sort` → `BookGrid`. Because sorting runs on the already-filtered list, all three conditions apply together.

**Data flow:** choose an option → `setSortOption` → `Books` re-runs → new `sortedBooks` → grid redraws.

**Viva questions**
1. *What does `filter()` return?* A new array holding only the items for which the function returns true.
2. *How does `sort()` work?* It reorders an array using a compare function: negative result → `a` first, positive → `b` first.
3. *Why copy before sorting?* `sort()` changes the array it is called on; copying protects the original data.
4. *Why does empty search show everything?* Every text includes `""`.
5. *Why not store the filtered list in state?* It can always be calculated from the original list plus the current choices, so one source of truth is simpler.

**Demo:** Category *Fiction* → type `a` → Sort *Price: High to Low* → show the result obeys all three → type nonsense to show the "No books found" message.

**Common mistakes:** sorting `allBooks` directly; forgetting `toLowerCase` on one side; comparing prices as strings.

---

## Feature 4 — My Reading Dashboard

**What it does:** On the Profile page, three boxes: books in the catalogue, books in *my* wishlist, books added by *me*.

**Files:** `pages/Profile.jsx`, `pages/Profile.css`, new `components/StatCard.jsx`, `utils/wishlist.js`, `pages/AddBook.jsx` (stores `addedBy`).

**Concepts:** props (`StatCard label value`), `.length`, `filter()`, component reuse.

**Data decisions (important to explain):**
- The old wishlist was one list shared by everyone. It is now saved per user under `bookverse_wishlist_<email>` (`getWishlistKey` in `wishlist.js`). Visitors who are not logged in keep using the original key.
- New books store `addedBy: <email>`. Books added before this change have no `addedBy`, so they are **not** counted as anyone's (we can't know who added them — we did not invent data).
- Wishlist count only counts ids that still match an existing book, so deleting a book never leaves a wrong count.

**Key lines:**
```jsx
const wishlistCount = allBooks.filter((book) => wishlistIds.includes(book.id)).length;
const myBooksCount = userBooks.filter((book) => book.addedBy === currentUser.email).length;
<StatCard label="In my wishlist" value={wishlistCount} />
```

**Data flow:** open Profile → read `localStorage` through helper functions → compute counts → pass them as props to `StatCard` → boxes drawn. Counts are re-read each time the page opens, so they update after changes.

**Viva questions**
1. *Where do the numbers come from?* Calculated from saved data with `filter()` and `.length`; nothing is hard-coded.
2. *How are users kept separate?* Wishlist key includes the email; books store `addedBy`.
3. *Why is an old book not counted?* It has no `addedBy`; guessing would be inventing data.
4. *What is a prop?* A value a parent gives a child, like `label` and `value`.
5. *Is this secure?* No. `localStorage` is stored in the browser and can be edited by anyone using it; a real app needs a backend with real authentication.

**Demo:** Log in as user A, add a book and wishlist one → Profile shows 1 and 1 → log out, log in as user B → Profile shows 0 and 0.

**Common mistakes:** counting `wishlistIds.length` directly (counts deleted books); forgetting `.email` when comparing.

---

## Extra — "Load More Books" from an online API (syllabus 67–72)

**What it does:** At the bottom of the Catalogue there is a **Load More Books** button. Each press fetches the next 20 books (with cover photos) from the free **Open Library** API, which has millions of books, and adds them to the catalogue. Search, category and sort work on them too.

**Files:** new `utils/onlineBooks.js`; `pages/Books.jsx`, `pages/Books.css`; `components/BookCard.jsx`.

**Concepts:** REST API with `fetch`, `async/await`, `try/catch` error handling, loading state, retry, pagination (page 1, page 2, ...), conditional rendering.

**Functions:**
- `fetchOnlineBooks(page)` (in `onlineBooks.js`) – asks the API for one page, checks the response, keeps only books with a cover, and shapes each one like our own books.
- `loadMoreBooks()` (in `Books.jsx`) – runs when the button is pressed; handles loading, success and error.

**Key lines:**
```js
const response = await fetch(url);
if (!response.ok) { throw new Error("Open Library returned an error"); }
const data = await response.json();
```
`fetch` sends the request; `await` waits for the answer. `fetch` only fails by itself when the internet is down, so we check `response.ok` for server errors. `.json()` turns the reply into a JavaScript object.
```js
"...search.json?q=subject:fiction&limit=20&page=" + page
```
`limit` is how many books per request; `page` chooses which batch. This is **pagination**.
```jsx
setLoading(true);  setLoadError('');
try { ...fetch... setOnlineBooks([...onlineBooks, ...result.books]); setNextPage(nextPage + 1); }
catch (error) { setLoadError('Could not load more books...'); }
setLoading(false);
```
`loading` makes the button show "Loading..." and disables it. On success the new books are added after the old ones (`[...old, ...new]`) and `nextPage` goes up by 1. On failure the error message shows and the button says **Try Again** (that is the *retry*); because `nextPage` did not change, the same page is requested again.
```js
price: 5 + (doc.cover_i % 2500) / 100,
```
Open Library does not sell books, so it has **no real prices**. We make a **sample price** between 5.00 and 29.99 from the cover id: `%` gives the remainder (0–2499), dividing by 100 gives 0–24.99, and adding 5 gives 5.00–29.99. The same book always gets the same price, so price sorting is stable. **Say clearly in the viva that these are demo prices, not real ones.**
```jsx
{book.rating !== undefined && <span>...</span>}
```
Not every online book has a rating, so it is shown only when it exists. Online books open their page on openlibrary.org in a new tab instead of our Book Details page.
Because every book now has a price, sorting by price works the same for all books.

**Data flow:** press button → `loading = true` → `fetch` → books arrive → added to `onlineBooks` state → `allBooks` includes them → filter and sort run → grid redraws → `loading = false`.

**Viva questions**
1. *What is a REST API / what does `fetch` do?* An API is a web address that returns data; `fetch` sends a request to it and gives back the reply.
2. *Why `async/await`?* The reply takes time; `await` pauses that function until it arrives without freezing the page.
3. *Why `try/catch`?* If the internet is down or the server fails, the code jumps to `catch` and shows a message instead of crashing.
4. *What is pagination?* Loading data in small pages (20 at a time) instead of everything at once; `page` says which one.
5. *How is retry done?* The same button runs the same function again with the same `nextPage`.

**Demo:** Open Catalogue → press Load More twice (new books with covers appear) → search for an author among them → turn off Wi-Fi and press again to show the error and **Try Again** → turn Wi-Fi on and retry.

**Common mistakes:** forgetting `await` (you get a Promise, not data); not checking `response.ok`; setting `nextPage` before success (a failed page would be skipped); using the old `onlineBooks` instead of `[...onlineBooks, ...new]`.

**Limits to say honestly:** loaded online books are forgotten when you leave the Catalogue page; search and filters only see books that have been loaded; the API needs internet and can sometimes be slow.

---

## localStorage vs a backend database
`localStorage` lives inside one browser on one computer, holds only text, and anyone using that browser can read or change it. A backend database is on a server, shared across devices and protected by the server. BookVerse is frontend-only, so it uses `localStorage`.
