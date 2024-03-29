import React, { useEffect, useState, useTransition } from 'react';
import { isEmpty } from 'lodash';
import CustomAlert from '@lib/alert';
import Modal from '@lib/components/Modal';
import { uid } from 'react-uid';

const assertPerson = (person) => {
	if (isEmpty(person.name.trim())) {
		throw ['이름을 입력하세요.', 'name'];
	}
	if (person.age <= 0) {
		throw ['나이를 확인해주세요.', 'age'];
	}
	if (person.age <= 0) {
		throw ['신장을 확인해주세요.', 'height'];
	}
	if (person.age <= 0) {
		throw ['무게를 확인해주세요.', 'weight'];
	}
	if (isEmpty(person.job.trim())) {
		throw ['직책을 입력하세요.', 'job'];
	}
};

const ProfileDetail = ({ personId }) => {
	const [isLoading, startTransition] = useTransition();
	const [profile, setProfile] = useState(null);
	const handleDeletePerson = () => {
		CustomAlert.question({
			html: `${profile.name}회원을 삭제하시겠습니까?`,
			callback: () => {
			 
			},
		});
	};

	const handlePostPerson = (request) => {
		CustomAlert.question({
			html: '등록하시겠습니까?',
			callback: () => {
			 
			},
		});
	};

	const handlePutPerson = (request) => {
		CustomAlert.question({
			html: `${profile.name}회원을 수정 하시겠습니까?`,
			callback: () => {
		 
			},
		});
	};

	const handleSubmitPerson = (e) => {
		e.preventDefault();
		const request = {
			name: e.target.name.value,
			age: Number(e.target.age.value),
			weight: Number(e.target.weight.value),
			height: Number(e.target.height.value),
			job: e.target.job.value,
		};

		try {
			assertPerson(request);
			if (!personId) {
				handlePostPerson(request);
			} else {
				handlePutPerson(request);
			}
		} catch ([message, reason]) {
			CustomAlert.error({
				html: message,
				callback: () => {
					const errorTarget = e.target?.[reason];
					errorTarget?.focus();
				},
			});
		}
	};

	const preloadProfile = () => {
		startTransition(async () => {
			const res = "";
			setProfile(res.data);
		});
	};

	useEffect(() => {
		if (personId) {
			preloadProfile();
		} else {
			setProfile({
				name: '',
				age: 10,
				weight: 50,
				height: 150,
				job: '',
			});
		}
	}, [personId]);

	if (!isLoading && profile) {
		return (
			<form onSubmit={handleSubmitPerson}>
				<div className={'card'}>
					<div
						className="form-group"
						style={{ marginBottom: '20px' }}
					>
						<div className="form-control">
							<label>
								<span className="mr-10">이름 :</span>
								<input
									type="text"
									name="name"
									defaultValue={profile.name}
								/>
							</label>
						</div>
						<div className="form-control">
							<label>
								<span className="mr-10">나이 :</span>
								<input
									type="number"
									name="age"
									defaultValue={profile.age}
								/>
							</label>
						</div>
						<div className="form-control">
							<label>
								<span className="mr-10">신장 :</span>
								<input
									type="number"
									name="height"
									defaultValue={profile?.height}
								/>
							</label>
						</div>
						<div className="form-control">
							<label>
								<span className="mr-10">무게 :</span>
								<input
									type="number"
									name="weight"
									defaultValue={profile?.weight}
								/>
							</label>
						</div>
						<div className="form-control">
							<label>
								<span className="mr-10">직책 :</span>
								<input
									type="text"
									name="job"
									defaultValue={profile?.job}
								/>
							</label>
						</div>
					</div>

					<div>
						<button
							className="mr-10"
							type={'button'}
							onClick={handleDeletePerson}
						>
							삭제하기
						</button>
						<button type="submit">{personId ? '수정하기' : '등록하기'}</button>
					</div>
				</div>
			</form>
		);
	}

	if (!isLoading && !profile) {
		return (
			<div className={'card'}>
				<h4>오류발생</h4>
			</div>
		);
	}

	return (
		<div className={'card'}>
			<h4>로딩중...</h4>
		</div>
	);
};
const ProfileCard = ({ profile }) => {
	const [openDetail, setOpenDetail] = useState(false);

	return (
		<div className="card">
			<h4>{profile.name ?? '리뷰'}</h4>
			<div className={'age_box'}>
				<small>나이 : {profile?.age ?? '알 수없음'}</small>
			</div>
			<div>
				<div>
					<p className="mb-10">
						신장 : <strong>{profile?.height}</strong>
					</p>
					<p className="mb-10">
						무게 : <strong>{profile?.weight}</strong>
					</p>
				</div>
				<button onClick={() => setOpenDetail(true)}>자세히 보기</button>
			</div>
			<Modal
				isVisible={openDetail}
				setIsVisible={setOpenDetail}
			>
				<ProfileDetail personId={profile.id} />
			</Modal>
		</div>
	);
};
//전통적인 방식에 apiCall
const Typical = () => {
	const [isLoading, startTransition] = useTransition();
	const [people, setPeople] = useState([]);
	const [isOpenRegister, setIsOpenRegister] = useState(false);

	useEffect(() => {
		startTransition(async () => {
			const res = "await ExampleService.fetchPeople()";
			setPeople(res?.data ?? []);
		});
	}, []);

	return (
		<>
			<div className="container">
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<h1>회원목록</h1>
					<div>
						<button
							type="button"
							onClick={() => setIsOpenRegister(true)}
						>
							등록하기
						</button>
					</div>
				</div>
				<div className={'people_wrap'}>
					{isLoading && <p>로딩중...</p>}
					{people.map((profile) => (
						<ProfileCard
							key={uid(profile)}
							profile={profile}
						/>
					))}
				</div>
				<Modal
					isVisible={isOpenRegister}
					setIsVisible={setIsOpenRegister}
				>
					<ProfileDetail personId={null} />
				</Modal>
			</div>
		</>
	);
};
export default Typical;
