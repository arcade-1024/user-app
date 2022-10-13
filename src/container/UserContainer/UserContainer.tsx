import axios from "axios";
import { useEffect, useState } from "react";
import { Plus } from "react-feather";
import AddUserModal from "./components/AddUserModal/AddUserModal";
import UserCard from "./components/UserCard/UserCard";

const people = [
	{
		name: "Leonard Krasner",
		role: "Senior Designer",
		imageUrl:
			"https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
		twitterUrl: "#",
		linkedinUrl: "#",
	},
	// More people...
];
export default function UserContainer() {
	// https://dummy.restapiexample.com/api/v1/employees
	const [openAddUserModal, setOpenAddUserModal] = useState(false);

	const [user, setUser] = useState<any[]>([]);
	useEffect(() => {
		const userDataFetch = async () => {
			try {
				if (user.length === 0) {
					const res = await axios.get(
						`https://crudcrud.com/api/1460612762044928a8927fa9636cbe4c/users`
					);
					setUser(res.data);
				}
			} catch (e) {
				console.log(e);
			}
		};
		userDataFetch();
	}, []);

	return (
		<div className="bg-gray-900 rounded-xl">
			<div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 lg:py-14">
				<div className="space-y-12 ">
					<div className="md:max-w-xl lg:max-w-3xl xl:max-w-none flex items-center justify-between">
						<div className="space-y-2 sm:space-y-4">
							<h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
								User data
							</h2>
							<p className="text-xl text-gray-300">Meet all the users.</p>
						</div>
						<button
							className="flex items-center border px-4 py-2 rounded-lg text-white hover:text-indigo-400 hover:border-indigo-400 hover:bg-gray-700 transition duration-300"
							onClick={() => setOpenAddUserModal(!openAddUserModal)}
						>
							<span className="text-xl font-medium mr-2">Add User</span>{" "}
							<Plus />
						</button>
					</div>
					<ul
						role="list"
						className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8"
					>
						{user.map((person) => (
							<UserCard
								imageUrl={person.avatar}
								key={person.name}
								name={person.name}
								email={person.email}
								country={person.country}
								dob={person.dob}
								id={person._id}
							/>
						))}
						{user.length === 0 && (
							<div className="h-44 flex items-center justify-center"></div>
						)}
					</ul>
				</div>
			</div>
			<AddUserModal
				open={openAddUserModal}
				closeModal={() => setOpenAddUserModal(!openAddUserModal)}
			/>
		</div>
	);
}
