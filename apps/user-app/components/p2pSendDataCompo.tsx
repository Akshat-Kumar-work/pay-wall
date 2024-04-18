import { Card } from "@repo/ui/card";

export const P2pSendDataCompo = ({ transactions }: { transactions: {  time: Date; amount: number;   id: number; to:string|null }[] }) => {

  if (!transactions.length) {
    return (
      <Card title="Recent Debit Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  return (
    <Card title="Recent Debit Transactions">
      <div className="pt-2">
        {transactions.map((singleTransaction) => (
          <div className="flex justify-between">

            <div>
              <div className="text-sm font-bold">Sent INR</div>
            
              <div className="text-slate-600 text-xs">
                {singleTransaction.time.toDateString()}
              </div>

              <div>
               To {singleTransaction.to}
              </div>
            </div>

            <div className="flex flex-col  items-end ">

              <div>
               - Rs {singleTransaction.amount / 100}
              </div>

             
            
            </div>

          </div>
        ))}
      </div>
    </Card>
  );
};
