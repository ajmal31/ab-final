"use client"
import { Modal } from '@shopify/polaris';
import Image from 'next/image';
import { AppProvider } from '@shopify/polaris'
const ProductModal = ({ data, onClose }) => {

    const handleShow = () => onClose();

    return (
        <AppProvider i18n={{}}>
            <Modal
                open
                onClose={handleShow}
            >
                {/* Header section  */}
                <div className='border-b '>

                    <Modal.Section>

                        <p className='my-1 text-xl'>{data?.title}</p>   


                    </Modal.Section>
                </div>


                {/* Image section */}
                <Modal.Section style={{ border: "none" }} >
                    <div className='flex items-center justify-center w-full h-full '>

                        <Image src={data?.image} height={100} width={200} alt="product_image" />

                    </div>
                </Modal.Section>

                {/* Description section */}
                <Modal.Section>
                    <div className=' px-7'>
                        <div className='h-full w-full border-y-2 py-12 border-gray-600' >
                            <p className='text-3xl'>Description</p>
                            <p>{data?.description}</p>

                        </div>

                    </div>
                </Modal.Section>
                {/* Rating section */}
                <Modal.Section  >
                    <div className=' px-7'>
                        <div className='h-full w-full  py-12 border-gray-600' >

                            <div className='mb-1' >
                                <p className='text-3xl' >Rating:</p>
                            </div>

                            <span className='font-bold'>Rating:</span>{data?.rating.rate}
                            <br />
                            <span className='font-bold'>Rated by:</span>{data?.rating.count}


                        </div>

                    </div>
                </Modal.Section>



            </Modal>
        </AppProvider>
    );
};

export default ProductModal;