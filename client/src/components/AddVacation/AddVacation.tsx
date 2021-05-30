import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postNewVacation, updatePictureForVacation } from "../../store/actions/vacationsActions";
import ImageIcon from "@material-ui/icons/Image";
import "./AddVacation.css";
import { useForm } from "react-hook-form";
import vacaPH from "../../assets/images/vacation-placeholder.jpg";
import { useHistory } from "react-router-dom";
import { useRef } from "react";
import { VacationModel } from "../../models/VacationModel";

function AddVacation() {
    const dispatch = useDispatch();
    const [isVacationUploaded, setIsVacationUploaded] = useState(false);
    const [picToUpload, setPicToUpload] = useState<File>();
    const [vacationId, setVacationId] = useState<number>();
    const history = useHistory();

    const routeChange = (path: string) => {
        history.push(path);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();
    const startDate = useRef({});
    const endDate = useRef({});
    startDate.current = watch("startDate", "");
    endDate.current = watch("endDate", "");

    const submitVacation = async (data: VacationModel) => {
        const id = await dispatch(postNewVacation(data));
        setVacationId(+id);
        setIsVacationUploaded(true);
    };
    const submitPicture = () => {
        dispatch(updatePictureForVacation(picToUpload!, vacationId!));
        routeChange("vacations");
    };

    useEffect(() => {
        if (document.querySelector(`#new-picture-input`)) {
            const imgInput: HTMLInputElement = document.querySelector(`#new-picture-input`)!;
            const imgPreview: HTMLImageElement = document.querySelector(`#new-vacation-image`)!;
            const handleImageUpload = () => {
                if (imgInput.files && imgInput.files?.length > 0) {
                    const data = imgInput.files[0];
                    setPicToUpload(data);
                    imgPreview.src = window.URL.createObjectURL(data);
                }
            };
            if (isVacationUploaded) {
                imgInput.addEventListener("change", handleImageUpload);
            } else {
                imgInput.removeEventListener("change", handleImageUpload);
            }
        }
    }, [isVacationUploaded]);

    useEffect(() => {
        const uploadButton = document.querySelector(`#new-upload-image-btn`);
        if (picToUpload) {
            uploadButton?.removeAttribute("disabled");
            return;
        }
        uploadButton?.setAttribute("disabled", "true");
    }, [picToUpload]);

    return (
        <>
            {!isVacationUploaded ? (
                <form onSubmit={handleSubmit(submitVacation)} className="new-vacation-form">
                    <h1>Add New Vacation</h1>
                    <div className="new-vacation-form-container">
                        <label>Destination: {errors.destination && errors.destination.message}</label>
                        <input type="text" {...register("destination", { required: "Required." })} />
                        <label>Description: {errors.description && errors.description.message}</label>
                        <textarea {...register("description", { required: "Required." })}></textarea>
                        <label>Start Date: {errors.startDate && errors.startDate.message}</label>
                        <input
                            type="date"
                            {...register("startDate", {
                                required: "Required.",
                                validate: (value) =>
                                    Date.parse(value) >= Date.now() || "A new vacation can't start in the past.",
                            })}
                        />
                        <label>End Date: {errors.endDate && errors.endDate.message}</label>
                        <input
                            type="date"
                            {...register("endDate", {
                                required: "Required.",
                                validate: (value) =>
                                    Date.parse(value) >= Date.parse(`${startDate.current}`) ||
                                    "Vacation can't end before it started.",
                            })}
                        />
                        <label>Price: {errors.price && errors.price.message}</label>
                        <input type="number" step="0.01" {...register("price", { required: "Required." })} />
                        <button id={`new-submit-btn`} className="new-submit-btn">
                            Add Vacation
                        </button>
                    </div>
                </form>
            ) : (
                <form onSubmit={handleSubmit(submitPicture)} className="new-vacation-form">
                    <h1>Upload Image</h1>
                    <div className="new-vacation-form-container">
                        <label htmlFor={`new-picture-input`} className="picture-input-label clickable">
                            <ImageIcon className="imageIcon" />
                            &nbsp;
                            <span>Choose Image</span>
                            <input
                                className="picture-input"
                                id={`new-picture-input`}
                                type="file"
                                {...register("picture")}
                            />
                        </label>
                        <img id={`new-vacation-image`} className="new-picture-preview" src={vacaPH} alt="preview" />
                        <button id={`new-upload-image-btn`} className="new-submit-btn" disabled>
                            Upload Image
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                routeChange("vacations");
                            }}
                            className="new-submit-btn"
                        >
                            No Thanks, I'm Done.
                        </button>
                    </div>
                </form>
            )}
        </>
    );
}

export default AddVacation;
