import { SET_APP_MODAL_ABOUT, SET_APP_MODAL_AMENITIES, SET_APP_MODAL_LOGIN, SET_APP_MODAL_REVIEWS, SET_APP_MODAL_SIGNUP } from "../store/system.reducer";
import { AboutModal } from "./AboutModal";
import { AmenitiesModal } from "./AmenitiesModal";
import { ReviewsModal } from "./ReviewsModal";
import { SignupModal } from "./SignupModal";

export function DynamicCmp({ modalType, stay, onClose }) {
    console.log('dyn', modalType);

    switch (modalType) {

        case SET_APP_MODAL_LOGIN:
            return <SignupModal onClose={onClose} />
        case SET_APP_MODAL_SIGNUP:
            return <SignupModal onClose={onClose} />
        case SET_APP_MODAL_ABOUT:
            return <AboutModal stay={stay} />
        case SET_APP_MODAL_AMENITIES:
            return <AmenitiesModal stay={stay} />
        case SET_APP_MODAL_REVIEWS:
            return <ReviewsModal stay={stay} />

        default: return

    }

}