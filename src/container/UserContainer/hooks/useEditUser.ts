import axios from "axios";
import { useFormik } from "formik";

export interface AddUserValues {
	name: string;
	email: string;
	avatar: string;
	dob: string;
	country: string;
}

const initialValues = { name: "", email: "", avatar: "", dob: "", country: "" };
export interface UserIdValue {
	id: string;
	closeModal: () => void;
}
const useEditUser = ({ id, closeModal }: UserIdValue) => {
	const formik = useFormik<AddUserValues>({
		initialValues,
		onSubmit: async (values, { resetForm }) => {
			try {
				const req = await axios.put(
					`https://crudcrud.com/api/1460612762044928a8927fa9636cbe4c/users/${id}`,
					{
						...values,
					}
				);
				console.log(req);
			} catch (error) {
				resetForm();
			}
			closeModal();
		},
	});
	return formik;
};

export default useEditUser;
