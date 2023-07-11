import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import {
    getFirestore,
    query,
    collection,
    addDoc,
    doc,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import {
    getDownloadURL,
    getStorage, listAll, ref, uploadBytes, 
} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCVqpFDuxZBmFz_bqecyUXde8680SFhLQg",
    authDomain: "fotoviet-9e27e.firebaseapp.com",
    projectId: "fotoviet-9e27e",
    storageBucket: "fotoviet-9e27e.appspot.com",
    messagingSenderId: "610913227926",
    appId: "1:610913227926:web:d3026ed2ced3df00275eb7"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

const signInWithGoogle = async () => {
    const userCredentials = await signInWithPopup(auth, googleProvider)
    const credential = GoogleAuthProvider.credentialFromResult(userCredentials);
    const token = credential.accessToken;
    const user = userCredentials.user;
    console.log(user);

    let check = false;
    let photographers = await getAllPhotographers();
    console.log(photographers)
    photographers.forEach((photographer) => {
        if (photographer.uid === user.uid) check = true;
    })
    let urlRedirect = ""
    if (check) {
        urlRedirect = '/payments'
    } else {
        addDoc(collection(db, 'photographer'), {
            uid: user.uid,
            name: user.displayName ?? user.uid,
            firstName: "",
            lastName: user.displayName ?? user.uid,
            accountName: `${user.displayName ?? user.uid} `,
            nameInIDCard: "",
            email: user.email ?? "",
            thumbnailUrl: user.photoURL ?? `https://ui-avatars.com/api/${user.displayName ?? "A"}`,
            follower: 0,
            rating: 5.0,
            pack: "",
            connected: 0,
            lastOrder: new Date(),
            comments: [],
            numberIDCard: "",
            phone: "",
            workLocations: [],
            address: "",
            instagram: "",
            facebook: "",
            introdution: "",
            topics: [],
            skills: [],
            allowance: "",
            images: [],
            verified: false
        },).then(() => {
            urlRedirect = `/personal/${user.uid}`
        })
    }
    return urlRedirect;
};

const logInWithEmailAndPassword = async (email, password) => {
    try {
        return await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
    }
};

const registerWithEmailAndPassword = async (
    firstName, lastName, email, password, role,
) => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then(
            (result) => {
                const user = result.user;
                if (role === "Thợ chụp ảnh cần tìm kiếm khách hàng") {
                    addDoc(collection(db, 'photographer'), {
                        uid: user.uid,
                        name: `${firstName} ${lastName}`,
                        firstName: firstName,
                        lastName: lastName,
                        accountName: `${firstName} ${lastName}`,
                        nameInIDCard: "",
                        email: user.email ?? "",
                        thumbnailUrl: `https://ui-avatars.com/api/${firstName.replace(" ", "_")}`,
                        follower: 0,
                        rating: 5.0,
                        pack: "",
                        connected: 0,
                        lastOrder: new Date(),
                        comments: [],
                        numberIDCard: "",
                        phone: "",
                        workLocations: [],
                        address: "",
                        instagram: "",
                        facebook: "",
                        introdution: "",
                        topics: [],
                        skills: [],
                        allowance: "",
                        images: [],
                        verified: false
                    },)
                } else {
                    addDoc(collection(db, "users"), {
                        uid: user.uid,
                        name: `${firstName} ${lastName}`,
                        email: user.email ?? null,
                        role: role,
                        thumbnailUrl: user.photoURL ?? null,
                        address: null,
                    });
                }
            }
        ).catch(err => console.error(err));
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = async () => {
    localStorage.removeItem('user')
    return await signOut(auth);
};

const getAccountInfor = async () => {
    return await getDocs(collection(db, "photographer"));
}

const getPhotographer = async (uid) => {
    let photographer;
    const q = query(collection(db, "photographer"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        photographer = doc.data()
    });
    return photographer;
}

// const createComment = async () => {
//     return await addDoc(collection(db, "comments", {
//         content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//         rating: 4,
//         commenter: auth.currentUser.name,
//         locate: "Ho Chi Minh"
//     }));
// }

const getAllPhotographers = async () => {
    const querySnapshot = await getDocs(collection(db, "photographer"))
    return querySnapshot.docs.map(ref => ref.data())
}

const updateInforPhotographer = async (
    firstName,
    lastName,
    accountName,
    nameInIDCard,
    numberIDCard,
    phone,
    workLocations,
    address,
    instagram,
    facebook,
    introdution,
    pack,
    topics,
    skills,
    allowance,
    images,
    thumbnailUrl,
    verified
) => {
    const querySnapshot = await getDocs(collection(db, "photographer"));
    let docId;
    querySnapshot.docs
        .forEach((item) => {
            if (`${item.data().uid} : ${auth.currentUser.uid}`) {
                docId = item.id
            }
        });

    console.log(docId);
    return await updateDoc(
        doc(db, "photographer", docId),
        {
            name: `${firstName} ${lastName}`,
            firstName: firstName,
            lastName: lastName,
            accountName: accountName,
            nameInIDCard: nameInIDCard,
            thumbnailUrl: thumbnailUrl !== '' ? thumbnailUrl : `https://ui-avatars.com/api/${firstName}`,
            follower: 0,
            rating: 5.0,
            topics: topics,
            pack: pack,
            connected: 0,
            lastOrder: new Date(),
            comments: [],
            numberIDCard: numberIDCard,
            phone: phone,
            workLocations: workLocations,
            address: address,
            instagram: instagram,
            facebook: facebook,
            introdution: introdution,
            skills: skills,
            allowance: allowance,
            images: images,
            verified: verified
        }
    )
}

const uploadFile = async (file, sub) => {
    return await uploadBytes(ref(storage, `foto-images/user-${auth.currentUser.uid}`), file);
}

const uploadMultipleFiles = async (files) => {
    const promises = [];
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const storageRef = ref(storage, `foto-images/user-${auth.currentUser.uid}/topic-images/img_${i}`);
        const uploadTask = uploadBytes(storageRef, file);
        promises.push(uploadTask);
    }
    return await Promise.all(promises);
}

const getImage = async (link) => {
    return await getDownloadURL(ref(storage, link))
}

const getMultipleImages = async (link) => {
    const listRef = ref(storage, link);
    const res = await listAll(listRef);
    const datas = []
    await Promise.all(
        res.items.map(async (itemRef) => {
            return await getDownloadURL(itemRef)
                .then((res) => {
                    console.log(res);
                    datas.push(res)
                })
        })
    )
    return datas;
}


//param topics : Array<String> topics
//returns list of users that have topic is filtered
const filterTopic = async (topics) => {
    const querySnapshot = await getDocs(collection(db, "photographer"))
    const users = querySnapshot.docs.map(ref => ref.data())
    const usersFiltered = users.filter((user) => {
        const containsAny = topics.some(item => user.topics.includes(item));
        if (containsAny.length > 0) return user;
    })
    return usersFiltered;
}


//param salary : number
//returns list of users have salary lower than expect salary
const filterSalary = async (salary) => {
    const querySnapshot = await getDocs(collection(db, "photographer"))
    const users = querySnapshot.docs.map(ref => ref.data())
    const usersFiltered = users.filter((user) => {
        if (user.allowance <= salary) return user;
    })
    return usersFiltered;
}

//param workLocation : string
//returns return user have workLocation same with search value
const filterWorkLocation = async (workLocation) => {
    const querySnapshot = await getDocs(collection(db, "photographer"))
    const users = querySnapshot.docs.map(ref => ref.data())
    const usersFiltered = users.filter((user) => {
        if (user.workLocations === workLocation) return user;
    })
    return usersFiltered;
}

//param uid : string
//returns status of account : true/false
const checkVerified = async (uid) => {
    let photographer;
    const q = query(collection(db, "photographer"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        if (photographer.uid === uid) {
            photographer = doc.data()
        }
    });
    return photographer.verified;
}

//param uid : string
//returns account is in photoPro paid or not : string
const getPhotoLicense = async (uid) => {
    let photographer;
    const q = query(collection(db, "photographer"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        if (photographer.uid === uid) {
            photographer = doc.data()
        }
    });
    return photographer.pack ?? "Chưa nâng cấp FotoPro";
}


//param verified : boolean
//returns updated status
const updateVerifyStatus = async (verified, uid) => {
    const querySnapshot = await getDocs(collection(db, "photographer"));
    let docId;
    querySnapshot.docs
        .forEach((item) => {
            if (item.data().uid === uid) {
                docId = item.id
            }
        });

    return await updateDoc(
        doc(db, "photographer", docId),
        {
            verified: verified
        }
    )
}


//param pack : string
//returns updated status of pack ('FotoPro or ""').
 
const updatePackStatus = async (pack, uid) => {
    const querySnapshot = await getDocs(collection(db, "photographer"));
    let docId;
    querySnapshot.docs
        .forEach((item) => {
            if (item.data().uid === uid) {
                docId = item.id
            }
        });

    return await updateDoc(
        doc(db, "photographer", docId),
        {
            pack: pack
        }
    )
}

const deleteImage = async (uid, topic, images) => {
    const querySnapshot = await getDocs(collection(db, "photographer"));
    let docId;
    const data = querySnapshot.docs
        .forEach((item) => {
            if (item.data().uid === uid) {
                docId = item.id
            }
        });

    return await updateDoc(
        doc(db, "photographer", docId),
        {
            images: [
                data.images.filter((imageSet) => {
                    return imageSet.topic !== topic
                }),
                {
                    topic: topic,
                    links: images
                    /**
                     * Sample data:
                     * {
                     *  topic: "Name of topic",
                     *  links: [
                     *     "firestore-path/image1.png",
                     *     "firestore-path/image2.png",
                     *  ]
                     * }
                     */
                }
            ]
        }
    )
}

const deleteTopics = async (uid, topic) => {
    const querySnapshot = await getDocs(collection(db, "photographer"));
    let docId;
    const data = querySnapshot.docs
        .forEach((item) => {
            if (item.data().uid === uid) {
                docId = item.id
            }
        });

    
    return await updateDoc(
        doc(db, "photographer", docId),
        {
            images: [
                data.images.filter((imageSet) => {
                    return imageSet.topic !== topic
                })
            ],
            topics: [
                data.topics.filter((topicName) => {
                    return topicName !== topic
                })
            ]
        }
    )
}

export {
    auth,
    db,
    storage,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
    getAccountInfor,
    updateInforPhotographer,
    getPhotographer,
    getAllPhotographers,
    uploadFile,
    uploadMultipleFiles,
    getImage,
    getMultipleImages,
    // authStateListener,
    filterTopic,
    filterSalary,
    filterWorkLocation,
    checkVerified,
    getPhotoLicense,
    updateVerifyStatus,
    updatePackStatus,
    deleteImage,
    deleteTopics
};