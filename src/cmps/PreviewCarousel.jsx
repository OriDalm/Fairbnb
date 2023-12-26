import Skeleton from "react-loading-skeleton";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function PreviewCarousel({ stay }) {
    const isLoading = useSelector(storeState => storeState.systemModule.isLoading)

    const CustomLeftArrow = ({ onClick }) => (
        <button className='custom-arrow left' onClick={onClick}  >
            <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218789/preview-left-arrow_eftw6l.svg' alt="" />
        </button >
    )

    const CustomRightArrow = ({ onClick }) => (
        <button className='custom-arrow right' onClick={onClick}  >
            <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218789/preview-right-arrow_zty6ze.svg' alt="" />
        </button >
    )

    const responsive = {
        desktop: {
            breakpoint: {
                max: 3000,
                min: 1024
            },
            items: 1,
        },
        tablet: {
            breakpoint: {
                max: 1024,
                min: 464
            },
            items: 1,
        },
        mobile: {
            breakpoint: {
                max: 464,
                min: 0
            },
            items: 1,
        },
    }

    return (
        <section>

            <div
                style={{
                    width: '100%',
                    height: '100%',
                }}
            >

                <Carousel
                    additionalTransfrom={0}
                    arrows
                    centerMode={false}
                    className='preview-image-carousel'
                    customTransition='transform 300ms ease-in-out'
                    dotListClass='dot-container'
                    draggable={false}
                    focusOnSelect={false}
                    infinite={false}
                    itemClass=''
                    minimumTouchDrag={80}
                    renderArrowsWhenDisabled={false}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={responsive}
                    rtl={false}
                    showDots={true}
                    sliderClass=''
                    slidesToSlide={1}
                    swipeable
                    customLeftArrow={<CustomLeftArrow />}
                    customRightArrow={<CustomRightArrow />}

                >
                    {
                        stay.imgUrls.map((img, index) =>
                            <Link key={index} to={`/stay/${stay._id}`}>
                                {isLoading && <Skeleton />}
                                <img className="preview-img"
                                    src={img}
                                    alt={`stay-pic-${index}`}
                                />
                            </Link>
                        )
                    }

                </Carousel>
            </div>
        </section>
    )
}