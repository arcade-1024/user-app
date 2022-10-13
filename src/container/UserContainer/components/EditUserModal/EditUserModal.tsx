import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import Modal from "../../../../common/Modal/Modal";
import useAddUser, { AddUserValues } from "../../hooks/useAddUser";
import ModalButtons from "../../../../common/Modal/ModalActions";
import { Field, FormikProvider } from "formik";
import axios from "axios";
import useEditUser from "../../hooks/useEditUser";

export interface EditUserModalInterface {
	open: boolean;
	closeModal: () => void;
	id: string;
}
const EditUserModal = ({ open, closeModal, id }: EditUserModalInterface) => {
	const formik = useEditUser({ id, closeModal });
	const {
		values,
		errors,
		touched,
		handleChange,
		handleBlur,
		handleSubmit,
		isSubmitting,
		resetForm,
		setFieldValue,
	} = formik;
	const [user, setUser] = useState<AddUserValues>();
	useEffect(() => {
		const userDataFetch = async () => {
			try {
				if (open) {
					const res = await axios(
						`https://crudcrud.com/api/1460612762044928a8927fa9636cbe4c/users/${id}`
					);
					console.log(res);
					setUser(res.data);
				}
			} catch (e) {
				console.log(e);
			}
		};
		userDataFetch();
	}, [open]);

	useEffect(() => {
		setFieldValue("name", user?.name);
		setFieldValue("avatar", user?.avatar);
		setFieldValue("country", user?.country);
		setFieldValue("dob", user?.dob);
		setFieldValue("email", user?.email);
	}, [user, open]);

	return (
		<Modal open={open} closeModal={closeModal} title="Edit user">
			<form onSubmit={handleSubmit}>
				<FormikProvider value={formik}>
					{Object.keys(values).map((key) => {
						return (
							<div key={key} className="mb-2 last:mb-0">
								<label htmlFor={key}>
									<span className="text-sm font-medium text-gray-800 mb-1 dark:text-white capitalize">
										{key}
									</span>
									<Field
										id={key}
										type={key}
										name={key}
										onChange={handleChange}
										className="disabled:opacity-50 px-4 py-2 text-sm border border-gray-400 rounded focus:outline-none focus:ring-2 ring-indigo-500 w-full"
									/>
								</label>
							</div>
						);
					})}
				</FormikProvider>
				<ModalButtons>
					<button
						type="button"
						className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
						onClick={() => {
							closeModal();
							resetForm();
						}}
					>
						Cancel
					</button>
					<button
						type="submit"
						className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-500  text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2  focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
					>
						Save
					</button>
				</ModalButtons>
			</form>
		</Modal>
	);
};

export default EditUserModal;
