

import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransaction";
import getBalance from "../../lib/getBalanceAction";
import { getOnRampTransactions } from "../../lib/AllTransactionAction";


export default async function() {


    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    return <div className="w-screen">

        
        <div className="text-4xl  text-center  text-[#6a51a6] pt-8 mb-8 font-bold">
            Transfer
        </div>


        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <AddMoney />
            </div>


            <div>
                <BalanceCard amount={balance?.amount || 0} locked={balance?.locked || 0}  />
                <div className="pt-4">
                    <OnRampTransactions transactions={transactions} />
                </div>
            </div>
        </div>

        
    </div>
}