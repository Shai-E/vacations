import { useEffect, useState } from "react";
import "./Vacation.css";
import vacaPH from "../../assets/images/vacation-placeholder.jpg";
import { useDispatch, useSelector } from "react-redux";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import Publish from "@material-ui/icons/Publish";
import moment from "moment";
import { useForm } from "react-hook-form";

import {
    deleteVacation,
    getAllVacations,
    postNewFollower,
    postVacationUpdate,
    removeFollower,
    updatePictureForVacation,
} from "../../store/actions/vacationsActions";
import { useRef } from "react";
import { VacationModel } from "../../models/VacationModel";
import { RootState } from "../../store/store";
import { IFollow } from "../../interfaces/IFollow";
import { IUpdateVacation } from "../../interfaces/IUpdateVacation";

const Vacation = ({ vacation, isFollowedInit }: { vacation: VacationModel; isFollowedInit: boolean }):JSX.Element => {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const [isEditMode, setIsEditMode] = useState(false);
    const [isFollowed, setIsFollowed] = useState(false);
    const [picToUpload, setPicToUpload] = useState<File>();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();
    const description = useRef({});
    const destination = useRef({});
    const price = useRef({});
    const startDate = useRef({});
    const endDate = useRef({});
    startDate.current = watch("startDate", "");
    endDate.current = watch("endDate", "");
    description.current = watch("description", "");
    destination.current = watch("destination", "");
    price.current = watch("price", "");

    const submitVacation = (data: VacationModel):void => {
        const objToSens: IUpdateVacation = {
            vacation: data,
            vacationId: +vacation.id!,
        };
        dispatch(() => dispatch(postVacationUpdate(objToSens)));
        dispatch(() => dispatch(getAllVacations()));
    };

    const submitPicture = ():void => {
        dispatch(() => dispatch(updatePictureForVacation(picToUpload!, vacation.id!)));
    };

    useEffect(():void => {
        const doesVacationExist = document.querySelector(`#edit${vacation.id}`) !== null;
        if (doesVacationExist) {
            const editBtn: HTMLInputElement = document.querySelector(`#edit${vacation.id}`)!;
            editBtn.addEventListener("change", (e) => {
                if (editBtn?.checked) setIsEditMode(true);
                if (!editBtn?.checked) {
                    const submitBtn: HTMLButtonElement = document.querySelector(`#submit-btn-${vacation.id}`)!;
                    submitBtn.click();
                    if (
                        Date.parse(`${endDate.current}`) < Date.parse(`${startDate.current}`) ||
                        !price.current ||
                        !destination.current ||
                        !description.current
                    )
                        return (editBtn.checked = true);
                    setIsEditMode(false);
                    dispatch(() => dispatch(getAllVacations()));
                }
            });
        }

        if (document.querySelector(`#follow${vacation.id}`) !== null) {
            const followBtn: HTMLInputElement = document.querySelector(`#follow${vacation.id}`)!;
            setIsFollowed(isFollowedInit);
            followBtn.addEventListener("change", (e) => {
                const data: IFollow = {
                    userId: +user.id,
                    vacationId: +vacation.id!,
                };
                if (followBtn?.checked) {
                    dispatch(() => dispatch(removeFollower(data)));
                    dispatch(() => dispatch(getAllVacations()));
                }
                if (!followBtn?.checked) {
                    dispatch(() => dispatch(postNewFollower(data)));
                    dispatch(() => dispatch(getAllVacations()));
                }
                setIsFollowed(!followBtn?.checked);
            });
        }
    }, [dispatch, isFollowedInit, vacation.id, user]);

    useEffect(():void => {
        if (document.querySelector(`#picture-input-${vacation.id}`)) {
            const imgInput: HTMLInputElement = document.querySelector(`#picture-input-${vacation.id}`)!;
            const imgPreview: HTMLImageElement = document.querySelector(`#vacation-image-${vacation.id}`)!;
            const handleImageUpload = () => {
                if (imgInput.files && imgInput.files?.length > 0) {
                    const data = imgInput.files[0];
                    setPicToUpload(data);
                    imgPreview.src = window.URL.createObjectURL(data);
                }
            };
            if (isEditMode === true) {
                imgInput.addEventListener("change", handleImageUpload);
            } else {
                imgInput.removeEventListener("change", handleImageUpload);
            }
        }
    }, [isEditMode, vacation.id]);

    return (
        <div className="Vacation" id={`vacation-card-${vacation.id}`}>
            <div className="inner-container-image">
                {isEditMode ? (
                    <>
                        <div className="picture-input-container">
                            <form onSubmit={handleSubmit(submitPicture)}>
                                <label htmlFor={`picture-input-${vacation.id}`} className="picture-input-label">
                                    <AddPhotoAlternateIcon className="imageIcon" />
                                    &nbsp;
                                    <span>Choose Image</span>
                                    <input className="picture-input" id={`picture-input-${vacation.id}`} type="file" />
                                </label>
                                <button className="submit-picture-btn">
                                    <Publish className="publishIcon" />
                                    Upload
                                </button>
                            </form>
                        </div>
                        {vacation.picture ? (
                            <img
                                id={`vacation-image-${vacation.id}`}
                                src={`${window.location.origin}/assets/uploads/${vacation.picture}`}
                                alt={`vacation ${vacation.id}`}
                            />
                        ) : (
                            <img id={`vacation-image-${vacation.id}`} src={vacaPH} alt="vacation placeholder" />
                        )}
                    </>
                ) : vacation.picture ? (
                    <img src={`${window.location.origin}/assets/uploads/${vacation.picture}`} alt={`upload`} />
                ) : (
                    <img id={`vacation-image-${vacation.id}`} alt={`vacation ${vacation.id}`} src={vacaPH} />
                )}
            </div>
            <form id={`form-edit-${vacation.id}`} onSubmit={handleSubmit(submitVacation)} className="form-edit">
                <div className="inner-container-details">
                    {isEditMode ? (
                        <div className="edit-inputs">
                            <label>Destination: {errors.destination && errors.destination.message}</label>
                            <input
                                type="text"
                                {...register("destination", { required: "Required." })}
                                defaultValue={vacation.destination}
                            />
                            <label>Description: {errors.description && errors.description.message}</label>
                            <textarea
                                {...register("description", { required: "Required." })}
                                defaultValue={vacation.description}
                            ></textarea>
                            <label>Start Date: {errors.startDate && errors.startDate.message}</label>
                            <input
                                type="date"
                                {...register("startDate", { required: "Required." })}
                                defaultValue={moment(vacation.startDate).format("YYYY-MM-DD")}
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
                                defaultValue={moment(vacation.endDate).format("YYYY-MM-DD")}
                            />
                            <label>Price: {errors.price && errors.price.message}</label>
                            <input
                                type="number"
                                step="0.01"
                                {...register("price", { required: "Required." })}
                                defaultValue={vacation.price}
                            />
                        </div>
                    ) : (
                        <>
                            <div>
                                <p className="vacation-text card-dates">
                                    <span>{moment(vacation.startDate).format("DD-MM-YYYY")}</span> -{" "}
                                    <span>{moment(vacation.endDate).format("DD-MM-YYYY")}</span>
                                </p>
                                <p className="vacation-text card-destination">{vacation.destination}</p>
                                <p className="vacation-text card-price">{vacation.price}$</p>
                            </div>
                            <p className="vacation-text card-description">{vacation.description}</p>
                        </>
                    )}
                    <div className="followers-container">
                        {user.isAdmin ? null : (
                            <input
                                id={`follow${vacation.id}`}
                                className="follow-input"
                                type="checkbox"
                                onChange={() => {}}
                                checked={isFollowed}
                            />
                        )}
                        {user.isAdmin ? null : <label htmlFor={`follow${vacation.id}`} className="follow-btn"></label>}
                        {user.isAdmin ? null : (
                            <span className="card-followers">
                                {vacation.followers}
                                <ThumbUpIcon className="ThumbUpIcon" />
                            </span>
                        )}
                        {user.isAdmin ? (
                            <input id={`edit${vacation.id}`} className="edit-input" type="checkbox" />
                        ) : null}
                        {user.isAdmin ? <label htmlFor={`edit${vacation.id}`} className="edit-btn"></label> : null}
                        {isEditMode ? (
                            <button
                                type="reset"
                                className="reset-btn"
                                onClick={(e) => {
                                    const btn: HTMLInputElement = document.querySelector(`#edit${vacation.id}`)!;
                                    btn.checked = false;
                                    setIsEditMode(false);
                                }}
                            >
                                ABORT ✖
                            </button>
                        ) : null}
                        {user.isAdmin ? (
                            <span
                                className="delete-btn"
                                onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(deleteVacation(vacation.id!));
                                }}
                            >
                                DELETE &#9851;
                            </span>
                        ) : null}
                        <button
                            type="submit"
                            form={`form-edit-${vacation.id}`}
                            id={`submit-btn-${vacation.id}`}
                            className="submit-btn"
                        ></button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Vacation;
