import { useState } from "react";
import Input from "../../../generics/inputs/input/Input";
import ToggleSwitch from "../../../generics/inputs/toggle-switch/ToggleSwitch";
import Button from "../../../generics/buttons/button/Button";
import './PlaylistCreationForm.scss'
import { useForm } from "react-hook-form";
import { ApiError, PlaylistsService } from "../../../../api";
import { getUser } from "../../../../http/token";
import { Query, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../App";
import type PopupProps from "../../../../traits/PopupProps";

interface PlaylistCreationFormProps extends PopupProps {

}

export default function PlaylistCreationForm({
    onClose
} : PlaylistCreationFormProps) {
    const user = getUser();
    const queryClient = useQueryClient();
    
    const {
        register,
        trigger,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const titleBlur = () => trigger("title");
    const [isPublic, setIsPublic] = useState(false);

    const handleIsPublicChange = () => setIsPublic((value) => !value);
    const handleFormSubmit = async (data:any) => {
        try {
            const payload = {
                is_public: isPublic ? 'true' : 'false',
                name: data.title,
            };
            await PlaylistsService.createPlaylist(
                user!.uuid!,
                payload
            );
            queryClient.invalidateQueries({
                predicate: (query: Query) => [queryKeys.playlists].some((v) => query.queryKey.includes(v))
            });
            onClose();
        } catch (e) {
            if (e instanceof ApiError) {
                console.log(e);
                console.log(e.body);
            }
            console.log("Failed to create playlist", e);
        }
    };
    
    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="app-playlist-creation-form">
            <p className="form-title">New playlist</p>
            <ToggleSwitch title="Is public?" value={isPublic} onChange={handleIsPublicChange} />
            <Input title="Name"
                error={errors.login && `${errors.login.message}`}
                {...register("title", { required: "Please your playlist name" })}
                onBlur={titleBlur}/>
            <Button onClick={() => {}} type="submit" className="bg-blue-600">
                <p className="button-text">Criar playlist</p>
            </Button>
        </form>
    );
}