import { Modal } from '@shopify/polaris';
const ProductModal = ({ data, onClose }) => {
    const handleShow = () => onClose();

    return (
        <Modal
            open
            onClose={handleShow}

        >
             {/* Header section  */}
            <div className='border-b '>
              
                <Modal.Section>


                    {/* <TextContainer  > */}
                        <p className='my-1 text-xl'>{data.title}</p>
                    {/* </TextContainer> */}


                </Modal.Section>
            </div>


            {/* Image section */}
            <Modal.Section style={{ border: "none" }} >
                <div className='flex items-center justify-center w-full h-full '>
                    {/* <TextContainer> */}
                    <img src={data?.image} className="w-2/4 h-2/6 " alt="product_image" />
                    {/* </TextContainer> */}
                </div>
            </Modal.Section>

            {/* Description section */}
            <Modal.Section>
                <div className=' px-7'>
                    <div className='h-full w-full border-y-2 py-12 border-gray-600' >
                        {/* <TextContainer> */}
                            <p className='text-3xl'>Description</p>
                            <p>{data?.description}</p>
                        {/* </TextContainer> */}
                    </div>

                </div>
            </Modal.Section>
            {/* Rating section */}
            <Modal.Section  >
                <div className=' px-7'>
                    <div className='h-full w-full  py-12 border-gray-600' >
                        {/* <TextContainer> */}
                            <div className='mb-1' >
                                <p className='text-3xl' >Rating:</p>
                            </div>

                            <span className='font-bold'>Rating:</span>{data.rating.rate}
                            <br />
                            <span className='font-bold'>Rated by:</span>{data.rating.count}

                        {/* </TextContainer> */}
                    </div>

                </div>
            </Modal.Section>



        </Modal>
    );
};

export default ProductModal;
