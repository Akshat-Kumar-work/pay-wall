import { Card } from "@repo/ui/card";

export const P2pTransacReceiveDATA_Component = ({ transactions }: { transactions: {  time: Date; amount: number;   id: number; from:string|null }[] }) => {

  if (!transactions.length) {
    return (
      <Card title="Recent Credit Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  return (
    <Card title="Recent Credit Transactions">
      <div className="pt-2">
        {transactions.map((singleTransaction) => (
          <div className="flex justify-between">

            <div>
              <div className="text-sm font-bold">Received INR</div>
            
              <div className="text-slate-600 text-xs">
                {singleTransaction.time.toDateString()}
              </div>

              <div>
               From {singleTransaction.from}
              </div>
            </div>

            <div className="flex flex-col  items-end ">

              <div>
               + Rs {singleTransaction.amount / 100}
              </div>

             
            
            </div>

          </div>
        ))}
      </div>
    </Card>
  );
};
