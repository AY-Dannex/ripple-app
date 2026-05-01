import { useUser } from "../context/UserContext";
import { useState, useEffect } from "react";
import pic from "../assets/pic.jpg"
import OtherUserProfileSkeleton from "./OtherUserProfileSkeleton";

function OtherUserProfile(){
    const { profile, loadingProfile } = useUser()

    useEffect(() => {
        console.log(profile)
    }, [profile])
    return(
        <div>
            {
                loadingProfile ? (
                    <OtherUserProfileSkeleton />
                ) : (
                    <div className="px-5 py-4">
                        {/* <h1 className="text-[20px] font-medium mb-3">My Profile</h1> */}
                        <div className="w-full flex gap-5 items-center  py-5 px-5 rounded-xl border shadow-md">
                            <div className="pic w-30 h-30 rounded-[300px] relative border cursor-pointer overflow-hidden">
                                <img src={profile?.profilePic || pic} alt="profile-pic" className="z-5 w-full h-full object-cover cursor-pointer " />
                            </div>
                            <div>
                                <h2 className="font-medium text-[18px]">{profile?.lastName} {profile?.firstName}</h2>
                                <small className="font-medium text-[#555]">{profile?.role}</small>
                            </div>
                        </div>
                        <div className="w-full py-4 px-5 mt-3 rounded-xl border shadow-md">
                            <div className="w-full flex justify-between">
                                <h1 className="text-[20px] font-medium">Persornal Information</h1>
                            </div>
                            <br />
                            <div className="grid grid-cols-3 gap-6 mb-10">
                                <div className="flex flex-col gap-1">
                                    <small className="pl-3">First Name</small>
                                    <p className="pl-3">{profile?.firstName}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <small className="pl-3">Last Name</small>
                                    <p className="pl-3">{profile?.lastName}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <small className="pl-3">Username</small>
                                    <p className="pl-3">{profile?.username}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-6 ">
                                <div className="flex flex-col justify-center gap-1">
                                    <small className="pl-3">Email</small>
                                    <p className="pl-3">{profile?.email}</p>
                                </div>
                                <div className="flex flex-col justify-center gap-1">
                                    <small className="pl-3">Role</small>
                                    <p className="font-medium pl-3 text-sm">{profile?.role}</p>
                                </div>
                            </div>
                            <div className="w-full mt-10 flex flex-col gap-3">
                                <small className="px-3">Bio</small>
                                <textarea readOnly placeholder="Add a bio" value={profile?.bio} className="w-full h-40 border rounded-xl p-2 text-[14px] resize-none"></textarea>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}
export default OtherUserProfile