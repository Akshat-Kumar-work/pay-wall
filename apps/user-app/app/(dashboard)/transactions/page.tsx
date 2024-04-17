import { Transactions } from "../../../components/Transactions";
import { getOnRampTransactions } from "../../lib/AllTransactionAction"

const  transaction  = async () => {
  const transactions = await getOnRampTransactions();
  return (
    <div>
      <Transactions transactions={transactions}/>
    </div>
  )
}

export default transaction;
