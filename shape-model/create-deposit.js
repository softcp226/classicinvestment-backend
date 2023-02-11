const Deposit_request = require("../model/deposit_request");
const Transaction = require("../model/transaction");
const { datetime, expiring_date_string } = require("./system-variables");

const set_scheduled_expiring_date = (req) => {
  let date = new Date();
  date.setDate(date.getDate() + 5);
  let end_date = date.getTime();
  return end_date;
};
const set_expiring_date = (req) => {
  let date = new Date();
  date.setDate(date.getDate() + 7);
  let end_date = date.getTime();
  return end_date;
};

const create_deposit = async (req) => {
  console.log("called create deposit");
  // let currentdate = new Date();
  // let datetime = `${currentdate.getFullYear()}-${
  //   currentdate.getMonth() + 1
  // }-${currentdate.getDate()} -  ${currentdate.getHours()}: ${currentdate.getMinutes()} : ${currentdate.getSeconds()}`;
  let ref = Math.floor(Math.random() * 100);
  const transaction = await new Transaction({
    user: req.body.user,
    refrence_number: `Deposit#${++ref} `,
    transaction_date: datetime,
    credit: `$${req.body.deposit_amount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
    status: "pending",
  });
  // console.log("transaction", transaction._id);
  const deposit_request = await new Deposit_request({
    user: req.body.user,
    deposit_amount: req.body.deposit_amount,
    payment_method: req.body.payment_method,
    date: datetime,
    scheduled_expiring_date: set_scheduled_expiring_date(),
    expiring_date: set_expiring_date(),
    expiring_date_string,
    // currency: req.body.currency,
    transaction: transaction._id,
  });

  transaction.set({ deposit_request: deposit_request ._id});

  await deposit_request.save();
  await transaction.save();
  return deposit_request;
};

module.exports = create_deposit;
