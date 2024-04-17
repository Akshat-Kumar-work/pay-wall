

export const Transactions = ({ transactions }: 

    { transactions: {  time: Date; amount: number;  status: string;  provider: string; }[] }) => {

  if (!transactions.length) {
    return (
      <div>
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </div>
    );
  }


  return (
    <div className=" flex flex-col min-h-screen  items-center ">

    <div className=" text-4xl  text-center  text-[#6a51a6] pt-8 mb-8 font-bold ">Transactions</div>

    <div className="pt-2 flex flex-col  justify-center ">


        <div className=" grid  grid-cols-5 gap-2 md:gap-7 p-3 ">
            <div className="  md:text-2xl font-bold"> Bank </div>
            <div className="  md:text-2xl font-bold"> Time </div>
            <div className=" md:text-2xl font-bold"> Date </div>
            <div className=" md:text-2xl font-bold"> Amount </div>
            <div className=" md:text-2xl font-bold"> Status </div>

        </div>

        {transactions.map((singleTransaction) => (

          <div className="grid grid-cols-5 gap-2 md:gap-7 p-3">

        <div className=" ">{ singleTransaction.provider}</div>
            
                <div className=" md:block  hidden   ">
                {singleTransaction.time.toTimeString()}
              </div>

              <div className=" md:hidden  visible   ">
                {  singleTransaction.time.toLocaleTimeString().substring(0,4)}
              </div>

              <div className=" md:block  hidden   ">
                {singleTransaction.time.toDateString()}
              </div>

              <div className=" md:hidden visible">
                {singleTransaction.time.getDate()}
              </div>



              <div className=" md:block  hidden">
              + Rs {singleTransaction.amount / 100}
              </div>

              <div className="md:hidden visible">
             {singleTransaction.amount / 100}
              </div>

              <div>
                {singleTransaction.status}
              </div>
            </div>

        ))}
      </div>


    </div>
  );
};
