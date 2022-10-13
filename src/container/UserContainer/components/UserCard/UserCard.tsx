import Image from "next/image";
import React from "react";
import { User } from "react-feather";
import { useState } from "react";
import EditUserModal from "../EditUserModal/EditUserModal";

export interface UserCardInterface {
	imageUrl: string;
	name: string;
	email: string;
	dob: string;
	country: string;
	id: string;
}
const UserCard = ({
	imageUrl,
	name,
	country,
	dob,
	email,
	id,
}: UserCardInterface) => {
	const [openEditUserModal, setOpenEditUserModal] = useState(false);

	return (
		<li
			key={name}
			className="rounded-lg bg-gray-800 py-10 px-6 text-center xl:px-10 xl:text-left"
		>
			<div className="space-y-6 xl:space-y-10">
				{imageUrl === "" ? (
					<div className="relative flex items-center justify-center">
						<User className="text-gray-400 absolute z-10" size={80} />
						<div className="w-44 h-44 rounded-full mx-auto blur-sm bg-gray-900 border flex items-center justify-center  "></div>
					</div>
				) : (
					<img
						className="mx-auto h-40 w-40 rounded-full xl:h-56 xl:w-56"
						src={imageUrl}
						alt=""
					/>
				)}
				<div className="space-y-2 xl:flex xl:items-center xl:justify-between ">
					<div className="space-y-3 ">
						<h3
							className="text-white text-4xl font-medium leading-6 cursor-pointer"
							onClick={() => setOpenEditUserModal(!openEditUserModal)}
						>
							{name}
						</h3>
						<div className="-space-y-1">
							<p className="text-white">{email}</p>
							<p className="text-white">{country}</p>
							<p className="text-white">{dob}</p>
						</div>
					</div>
				</div>
			</div>
			<EditUserModal
				open={openEditUserModal}
				closeModal={() => setOpenEditUserModal(!openEditUserModal)}
				id={id}
			/>
		</li>
	);
};

export default UserCard;
