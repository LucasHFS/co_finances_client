import { useState } from "react";
import moment from "moment";
import { useTransaction } from '@/modules/transactions';

export const useCreateTransactionModal = ({onClose}: any) => {
  const [price, setPrice] = useState('')
  const [dueAt, setDueDate] = useState(moment(new Date()).format("DD/MM/YYYY"));

  const modifiedValue = moment(moment(dueAt,"DD/MM/YYYY"),"MM-DD-YYYY");
  const { errors: requestErrors, createTransaction, refetchTransactions } = useTransaction()

  const transactionKinds = [
    { value: 'once', name: 'Única' },
    { value: 'fixed', name: 'Fixa' },
    { value: 'installment', name: 'Parcelas' }
  ]

  const installmentKind = transactionKinds[2]

  const handleClose = () => {
    onClose()
  }

  //@ts-ignore
  const handleCreate = async (values, { setSubmitting }) => {
    const data = {
      ...values,
      dueAt,
      price,
    }
    console.log({data})
    const success = await createTransaction(data);
    console.log({success})

    if(success){
      handleClose()
    }

    setSubmitting(false);
  }

  return {
    handleClose,
    handleCreate,
    modifiedValue,
    transactionKinds,
    installmentKind,
    setPrice,
    price,
    requestErrors,
    setDueDate,
  }
}
