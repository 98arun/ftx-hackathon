import React, { useState } from 'react';


const MerchantRegistration = () => {
    const [inputValue, setInputValue] = useState<any>({
        merchantKey: '',
        merchantName: '',
        merchantAddress: '',
    });
    const InputHandler = (event: any) => {
        const { value, name } = event.target
        setInputValue((prevalue: any) => {
            return {
                ...prevalue,
                [name]: value,
            }
        })
    }

    const _handleSubmit = () => {
        const { merchantKey, merchantName, merchantAddress } = inputValue
        if (!merchantKey) {
            alert('Enter your merchant key')
            return
        }
        if (!merchantName) {
            alert('Enter your merchant name ')
            return
        }
        if (!merchantAddress) {
            alert('Enter your merchant address')
            return
        }
        alert('Your registration successfull')
        setInputValue({
            merchantKey: '', merchantName: '', merchantAddress: ''
        })


    }
    return (
        <>
            <h1 className='heading'>Merchant Registration</h1>
            <input type='text' className='inputSearch mt4 ' placeholder='Enter your Merchant Key' onChange={InputHandler} name='merchantKey' /><br />
            <input type='text' className='inputSearch ' placeholder='Enter your Merchant Name' onChange={InputHandler} name='merchantName' /><br />
            <input type='text' className='inputSearch ' placeholder='Enter your Merchant Address' onChange={InputHandler} name='merchantAddress' /><br />
            <button type='submit' className='ml45 ' onClick={_handleSubmit}>Submit</button>
        </>
    )
}

export default MerchantRegistration
