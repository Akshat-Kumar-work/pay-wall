
import P2pCard from '../../../components/p2pCard'
import { BalanceCard } from '../../../components/BalanceCard'
import getBalance from '../../lib/getBalanceAction'
import getP2pTransacData from '../../lib/getp2pReceiveData'
import { P2pTransacReceiveDATA_Component } from '../../../components/p2pReceived'
import getP2pTransacDataSEND from '../../lib/getp2pSendData'
import { P2pSendDataCompo } from '../../../components/p2pSendDataCompo'

const peer2peerTransfer = async () => {
 const balance = await getBalance();
 const transactions= await getP2pTransacData();
 const SEND_transactions = await getP2pTransacDataSEND();



  return (
    <div className=' w-full  '>

        <div className=' flex md:flex-row flex-col  justify-start'>

        <div>
        <P2pCard></P2pCard>
        </div>

        <div className='   min-w-[50%] mt-5'>
        <BalanceCard amount={balance?.amount || 0 } locked={balance?.locked || 0} />

        </div>

        </div>
  
     
     <div className=' '>
     <P2pTransacReceiveDATA_Component transactions={transactions}  />
    <P2pSendDataCompo transactions={SEND_transactions}/>

     </div>


      </div>
    

  )
}

export default peer2peerTransfer