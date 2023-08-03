const { NotFoundError } = require("../../shared/errors");
const Book = require("../books/Book");
const Borrower = require("../borrowers/Borrower");
const Loan = require("./Loan");
const Admin = require("../admins/Admin")

function isDatetwomonth(date) {
    const twomonthdate = new Date();
    twomonthdate.setMonth(twomonthdate.getMonth() + 2);

    return new Date(date) <= twomonthdate;
}


const creatLoan = async ({ book, due_date, borrower, admin }) => {

    const exsitingBook = await Book.findById(book);
    if (!exsitingBook) {
        throw new NotFoundError("Book not found")
    }

    const exsitingBorrower = await Borrower.findById(borrower);
    if (!exsitingBorrower) {
        throw new NotFoundError("Borrower not found");
    }

    const borrowerLoan = await Loan.find({
        borrower,
        status: "overdue",
    });
    if (borrowerLoan.length > 0)
        throw new Error(
            "boshqasini ijaraga olishdan oldin kitobni qaytarib bering"
        );

    const borrowerLoanPending = await Loan.find({
        borrower,
        status: "pending",
    });


    if (borrowerLoanPending.length >= 10)
        throw new Error(
            "Muddati tugallanmagan kitob bor. 10 tadan ortiq kitob ijaraga olaolmaysiz."
        );

    if (!isDatetwomonth(due_date))
        throw new Error("arendaga 2 oydan kam vaqt beriladi");

    await Book.findByIdAndUpdate(exsitingBook._id, {

        copies: --exsitingBook.copies,
    });

    const result = await Loan.create({
        book,
        out_date: Date.now(),
        due_date,
        borrower,
        admin,
    });

    return result;
};

module.exports = creatLoan;