import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getUsers, saveUser } from "../../redux/slices/userSlice";
import { fetchGenders } from "../../redux/slices/genderSlice";
import { fetchUserTypes } from "../../redux/slices/userTypeSlice";
import { fetchRoles } from "../../redux/slices/roleSlice";
import TextField from "../../components/common/TextField";
import Button from "../../components/common/Button";
import AutoCompleteSelect, {
  Option,
} from "../../components/common/AutoCompleteSelect";
import DatePicker from "../../components/common/DatePicker";
import { toast } from "react-toastify";
import { User as UserIcon, LockKeyhole, Mail, Phone, User } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { themeClasses as tc } from "../../components/ThemeClasses";
import { IoMdRefresh } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";

interface UserForm {
  id?: string;
  loginName: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  surName: string;
  middleName: string;
  shortName: string;
  userCode: string;
  dob?: Date | null;
  doj?: Date | null;
  genderId?: string;
  curMobile: string;
  email: string;
  isActive: boolean;
  userType: string;
  roles: string[];
  orgId: string;
}

const UserCreationEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser, loading } = useAppSelector((state) => state.user);
  const { roles } = useAppSelector((state) => state.role);
  const { Genders } = useAppSelector((state) => state.gender);
  const { usertypes } = useAppSelector((state) => state.usertype);
  const { theme } = useTheme();
  const th = tc(theme);
  const [form, setForm] = useState<UserForm | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [originalData, setOriginalData] = useState<UserForm | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (id) {
      dispatch(getUsers(id));
    }
    dispatch(fetchRoles());
    dispatch(fetchGenders());
    dispatch(fetchUserTypes());
  }, [dispatch, id]);

useEffect(() => {
  if (currentUser) {
    const userData: UserForm = {
      id: currentUser._id,
      loginName: currentUser.loginName,
      password: "",
      confirmPassword: "",
      firstName: currentUser.firstName,
      surName: currentUser.surName,
      middleName: currentUser.middleName || "",
      shortName: currentUser.shortName || "",
      userCode: currentUser.userCode || "",
      dob: currentUser.dob ? new Date(currentUser.dob) : null,
      doj: currentUser.doj ? new Date(currentUser.doj) : null,
      genderId: currentUser.genderId,
      curMobile: currentUser.curMobile || "",
      email: currentUser.email,
      isActive: currentUser.isActive,

      // ✅ FIX userType (use only ID)
      userType: currentUser.userType?._id || "",

      // ✅ FIX roles (convert array of objects → array of ids)
      roles: currentUser.roles?.map(r => r._id) || [],

      orgId: currentUser.orgId || "",
    };

    setForm(userData);
    setOriginalData(userData);
  }
}, [currentUser]);


  const roleOptions: Option[] = (roles || []).map((role: any) => ({
    id: role._id,
    label: role.roleName,
    value: role._id,
  }));

  const genderOptions: Option[] = (Genders || []).map((gender: any) => ({
    id: gender._id,
    label: gender.name,
    value: gender._id,
  }));

  const userTypeOptions: Option[] = (usertypes || []).map((type: any) => ({
    id: type._id,
    label: type.userTypeName,
    value: type._id,
  }));

  const selectedRoles = form
    ? roleOptions.filter(role => form.roles.includes(role.id))
    : [];
  const selectedGender = form
    ? genderOptions.find((g) => g.id === form.genderId) || null
    : null;
  const selectedUserType = form
    ? userTypeOptions.find((t) => t.id === form.userType) || null
    : null;

  const handleInputChange = (field: keyof UserForm, value: any) => {
    if (form) {
      setForm({ ...form, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = () => {
    if (!form) return false;
    const newErrors: Record<string, string> = {};

    // Login Information validations
    if (!form.loginName) newErrors.loginName = t("text.requiredName", { key: t("text.loginName") });

    // Password validation for new users or when password is provided
    if (!id && !form.password) {
      newErrors.password = t("text.required", { key: t("text.password") });
    }
    if (form.password && form.password !== form.confirmPassword) {
      newErrors.confirmPassword = t("text.passwordsDoNotMatch");
    }

    if (!form.roles || form.roles.length === 0) newErrors.roles = t("text.required", { key: t("text.role") });

    // Personal Information validations
    if (!form.firstName) newErrors.firstName = t("text.required", { key: t("text.firstName") });
    if (!form.surName) newErrors.surName = t("text.required", { key: t("text.surname") });

    // Contact Information validations
    if (!form.email) newErrors.email = t("text.required", { key: t("text.email") });
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = t("text.invalidEmailFormat");

    if (!form.curMobile) newErrors.curMobile = t("text.required", { key: t("text.mobile") });
    else if (!/^[0-9]{10}$/.test(form.curMobile))
      newErrors.curMobile = t("text.invalidMobileNumber(mustbe10digits)");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!form || !validate()) return;

    try {
      const formatDate = (date?: Date | null): string | undefined => {
        if (!date) return undefined;
        return date.toISOString().split("T")[0];
      };

      const userData = {
        id: form.id, // For update, undefined for create
        loginName: form.loginName,
        password: form.password || undefined, // Only send password if provided
        firstName: form.firstName,
        surName: form.surName,
        middleName: form.middleName || undefined,
        shortName: form.shortName || undefined,
        userCode: form.userCode || undefined,
        dob: formatDate(form.dob),
        doj: formatDate(form.doj),
        genderId: form.genderId,
        curMobile: form.curMobile,
        email: form.email,
        isActive: form.isActive,
        userType: form.userType,
        roles: form.roles,
        orgId: form.orgId,
      };

      await dispatch(saveUser(userData)).unwrap();
      toast.success(t("text.updateToast", { key: t("text.user") }));
      navigate("/usermanagement/usercreation");
    } catch (error: any) {
      toast.error(error.message || t("text.updateErrorToast", { key: t("text.user") }));
      console.error("Error details:", error);
    }
  };

  const resetForm = () => {
    if (originalData) {
      setForm(originalData);
      setErrors({});
    }
  };

  if (!form) {
    return (
      <div className={`w-full px-4 py-6 transition-colors ${th.background} ${th.text}`}>
        <div>Loading user data...</div>
      </div>
    );
  }

  return (
    <div className={`w-full px-4 py-6 transition-colors ${th.background} ${th.text}`}>
      <div className="flex items-center justify-left gap-2 mb-4">
        <button
          onClick={() => navigate("/usermanagement/usercreation")}
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <IoChevronBackCircleSharp className="h-10 w-10 font-bold text-black-700" />
        </button>
        <h1 className={`text-2xl font-bold flex items-center gap-2 ${th.text}`}>
          <UserIcon className="text-blue-700 w-8 h-10" />{t("text.edit", { key: t("text.user") })}
        </h1>
      </div>

      <div className={`rounded-xl shadow-md p-4 mb-6 transition-colors ${th.card}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Login Information */}
          <div className="col-span-full border-b pb-2 mb-2">
            <h2 className={`text-lg font-medium text-gray-700 flex items-center gap-2 ${th.text}`}>
              <LockKeyhole className="w-5 h-5" /> {t("text.loginInformation")}
            </h2>
          </div>

          <TextField
            label={t("text.loginName")}
            value={form.loginName}
            placeholder={t("text.enterName", { key: t("text.loginName") })}
            onChange={(e) => handleInputChange("loginName", e.target.value)}
            error={errors.loginName}
            icon={<User className="w-4 h-4 text-gray-400" />}
          />

          <TextField
            label={t("text.password")}
            type="password"
            value={form.password}
            placeholder={id ? "Leave blank to keep current password" : t("text.enterpassword")}
            onChange={(e) => handleInputChange("password", e.target.value)}
            error={errors.password}
            icon={<LockKeyhole className="w-4 h-4 text-gray-400" />}
          />

          <TextField
            label={t("text.confirmPassword")}
            type="password"
            value={form.confirmPassword}
            placeholder={t("text.confirmPassword")}
            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
            error={errors.confirmPassword}
            icon={<LockKeyhole className="w-4 h-4 text-gray-400" />}
          />

          <div className="md:col-span-2 lg:col-span-3">
          <AutoCompleteSelect
  label="Role"
  options={roleOptions}
  selected={selectedRoles[0] || null}
  onChange={(opt) => handleInputChange("roles", [opt.id])}
/>

          </div>

          {/* Personal Information */}
          <div className="col-span-full border-b pb-2 mb-2 mt-4">
            <h2 className={`text-lg font-medium text-gray-700 flex items-center gap-2 ${th.text}`}>
              <User className="w-5 h-5" /> {t("text.personalInformation")}
            </h2>
          </div>

          <TextField
            label={t("text.firstName")}
            value={form.firstName}
            placeholder={t("text.enterName", { key: t("text.first") })}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            error={errors.firstName}
            required
          />

          <TextField
            label={t("text.middleName")}
            placeholder={t("text.enterName", { key: t("text.middle") })}
            value={form.middleName}
            onChange={(e) => handleInputChange("middleName", e.target.value)}
          />

          <TextField
            label={t("text.surname")}
            placeholder={t("text.enter", { key: t("text.surname") })}
            value={form.surName}
            onChange={(e) => handleInputChange("surName", e.target.value)}
            error={errors.surName}
            required
          />

          <TextField
            label={t("text.userCode")}
            value={form.userCode}
            placeholder={t("text.enter", { key: t("text.userCode") })}
            onChange={(e) => handleInputChange("userCode", e.target.value)}
          />

          <AutoCompleteSelect
            label={t("text.gender")}
            options={genderOptions}
            selected={selectedGender}
            onChange={(opt) => handleInputChange("genderId", opt.id)}
            placeholder={t("text.select", { key: t("text.gender") })}
          />

          <AutoCompleteSelect
            label={t("text.userType")}
            options={userTypeOptions}
            selected={selectedUserType}
            onChange={(opt) => handleInputChange("userType", opt.id)}
            placeholder={t("text.select", { key: t("text.userType") })}
          />

          <DatePicker
            label={t("text.dateOfBirth")}
            selected={form.dob}
            onChange={(date) => handleInputChange("dob", date)}
          />

          <DatePicker
            label={t("text.dateOfjoining")}
            selected={form.doj}
            onChange={(date) => handleInputChange("doj", date)}
          />

          {/* Contact Information */}
          <div className="col-span-full border-b pb-2 mb-2 mt-4">
            <h2 className={`text-lg font-medium text-gray-700 flex items-center gap-2 ${th.text}`}>
              <Phone className="w-5 h-5" /> {t("text.contactInformation")}
            </h2>
          </div>

          <TextField
            label={t("text.mobile")}
            value={form.curMobile}
            placeholder={t("text.enter", { key: t("text.mobileNumber") })}
            onChange={(e) => handleInputChange("curMobile", e.target.value)}
            error={errors.curMobile}
            required
            icon={<Phone className="w-4 h-4 text-gray-400" />}
          />

          <TextField
            label={t("text.email")}
            type="email"
            value={form.email}
            placeholder={t("text.enter", { key: t("text.email") })}
            onChange={(e) => handleInputChange("email", e.target.value)}
            error={errors.email}
            required
            icon={<Mail className="w-4 h-4 text-gray-400" />}
          />
        </div>

        <div className="mt-4 flex gap-2">
          <Button
            icon={<FaEdit />}
            text={t("text.update")}
            onClick={handleSubmit}
            bgColor={theme === "dark" ? "bg-blue-700" : "bg-blue-900"}
            disabled={loading}
          />
          <Button
            icon={<IoMdRefresh />}
            text={t("text.reset")}
            onClick={resetForm}
            bgColor={theme === "dark" ? "bg-red-700" : "bg-red-600"}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default UserCreationEdit;