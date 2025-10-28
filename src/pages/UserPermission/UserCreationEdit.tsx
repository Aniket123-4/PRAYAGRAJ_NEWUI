import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchUserById, updateUser } from "../../redux/slices/userSlice";
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
  USER_ID?: number;
  LOGIN_NAME: string;
  PASSWORD: string;
  CONFIRM_PASSWORD: string;
  RANK_ID?: number;
  SUR_NAME: string;
  FIRST_NAME: string;
  MIDDLE_NAME: string;
  SHORT_NAME: string;
  USER_CODE: string;
  DOB?: Date | null;
  DOA?: Date | null;
  DOJ?: Date | null;
  GENDER_ID?: number;
  CUR_PHONE: string;
  CUR_MOBILE: string;
  EMAIL: string;
  IS_ACTIVE: boolean;
  IS_SYSTEM: boolean;
  USER_TYPE_ID?: number;
  ORG_ID: string;
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
      dispatch(fetchUserById(parseInt(id)));
    }
    dispatch(fetchRoles());
    dispatch(fetchGenders());
    dispatch(fetchUserTypes());
  }, [dispatch, id]);

  useEffect(() => {
    if (currentUser) {
      const userData: UserForm = {
        USER_ID: currentUser.USER_ID,
        LOGIN_NAME: currentUser.LOGIN_NAME,
        PASSWORD: "",
        CONFIRM_PASSWORD: "",
        RANK_ID: currentUser.RANK_ID
          ? parseInt(currentUser.RANK_ID)
          : undefined,
        SUR_NAME: currentUser.SUR_NAME,
        FIRST_NAME: currentUser.FIRST_NAME,
        MIDDLE_NAME: currentUser.MIDDLE_NAME,
        SHORT_NAME: currentUser.SHORT_NAME,
        USER_CODE: currentUser.USER_CODE,
        // Fix: Check if date is already a string and parse it only if needed
        DOB: currentUser.DOB ? (typeof currentUser.DOB === 'string' ? new Date(currentUser.DOB) : currentUser.DOB) : null,
        DOA: currentUser.DOA ? (typeof currentUser.DOA === 'string' ? new Date(currentUser.DOA) : currentUser.DOA) : null,
        DOJ: currentUser.DOJ ? (typeof currentUser.DOJ === 'string' ? new Date(currentUser.DOJ) : currentUser.DOJ) : null,
        GENDER_ID: currentUser.GENDER_ID,
        CUR_PHONE: currentUser.CUR_PHONE || "",
        CUR_MOBILE: currentUser.CUR_MOBILE,
        EMAIL: currentUser.EMAIL,
        IS_ACTIVE: currentUser.IS_ACTIVE,
        IS_SYSTEM: currentUser.IS_SYSTEM,
        USER_TYPE_ID: currentUser.USER_TYPE_ID,
        ORG_ID: currentUser.ORG_ID || "",
      };
      setForm(userData);
      setOriginalData(userData);
    }
  }, [currentUser]);

  const roleOptions: Option[] = (roles || []).map((role: any) => ({
    id: role.RoleID,
    label: role.RoleName,
    value: role.RoleID,
  }));

  const genderOptions: Option[] = (Genders || []).map((gender: any) => ({
    id: gender.id,
    label: gender.name,
    value: gender.id,
  }));

  const userTypeOptions: Option[] = (usertypes || []).map((type: any) => ({
    id: type.USER_TYPE_ID,
    label: type.USER_TYPE_NAME,
    value: type.USER_TYPE_ID,
  }));

  const selectedRole = form
    ? roleOptions.find((r) => r.id === form.RANK_ID) || null
    : null;
  const selectedGender = form
    ? genderOptions.find((g) => g.id === form.GENDER_ID) || null
    : null;
  const selectedUserType = form
    ? userTypeOptions.find((t) => t.id === form.USER_TYPE_ID) || null
    : null;

  const handleInputChange = (field: keyof UserForm, value: any) => {
    if (form) {
      setForm({ ...form, [field]: value });
      //@ts-ignore
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = () => {
    if (!form) return false;
    const newErrors: Record<string, string> = {};

    // Login Information validations
    if (!form.LOGIN_NAME) newErrors.LOGIN_NAME = t("text.requiredName", { key: t("text.loginName") });

    // Make password and confirm password mandatory
    if (!form.PASSWORD) newErrors.PASSWORD = t("text.required", { key: t("text.password") });
    if (!form.CONFIRM_PASSWORD)
      newErrors.CONFIRM_PASSWORD = t("text.pleaseConfirmYourPassword");
    if (form.PASSWORD !== form.CONFIRM_PASSWORD) {
      newErrors.CONFIRM_PASSWORD = t("text.passwordsDoNotMatch");
    }

    if (!form.RANK_ID) newErrors.RANK_ID = t("text.required", { key: t("text.role") });


    // Personal Information validations
    if (!form.FIRST_NAME) newErrors.FIRST_NAME = t("text.required", { key: t("text.firstName") });
    // if (!form.SUR_NAME) newErrors.SUR_NAME =  t("text.required", { key: t("text.surname") });

    // Contact Information validations
    if (!form.EMAIL) newErrors.EMAIL = t("text.required", { key: t("text.email") });
    else if (!/^\S+@\S+\.\S+$/.test(form.EMAIL))
      newErrors.EMAIL = t("text.invalidEmailFormat");

    if (!form.CUR_MOBILE) newErrors.CUR_MOBILE = t("text.required", { key: t("text.mobile") });
    else if (!/^[0-9]{10}$/.test(form.CUR_MOBILE))
      newErrors.CUR_MOBILE = t("text.invalidMobileNumber(mustbe10digits)");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!form || !validate()) return;

    try {
      const formatDate = (date?: Date | string | null): string | null => {
        if (!date) return null;

        // If it's already a string, return it directly
        if (typeof date === 'string') return date;

        // If it's a Date object, convert to ISO string
        return date.toISOString().split("T")[0];
      };

      const userData = {
        USER_ID: form.USER_ID as number,
        roleId: form.RANK_ID?.toString() || "", // Changed from RANK_ID to roleId
        surName: form.SUR_NAME,
        firstName: form.FIRST_NAME,
        middleName: form.MIDDLE_NAME,
        shortName: form.SHORT_NAME,
        userCode: form.USER_CODE,
        dob: formatDate(form.DOB),
        doa: formatDate(form.DOA),
        doj: formatDate(form.DOJ),
        genderId: form.GENDER_ID?.toString() || "", // Ensure this matches server expectations
        curPhone: form.CUR_PHONE || null,
        curMobile: form.CUR_MOBILE,
        email: form.EMAIL,
        isActive: form.IS_ACTIVE,
        isDeleted: false,
        userTypeId: form.USER_TYPE_ID?.toString() || "", // Ensure this matches server expectations
        otp: "",
        loginName: form.LOGIN_NAME,
        password: form.PASSWORD || "",
        isSystem: form.IS_SYSTEM,
        orgId: form.ORG_ID,
      };
      // @ts-ignore
      await dispatch(updateUser(userData)).unwrap();
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
      <div
        className={`w-full px-4 py-6 transition-colors ${th.background} ${th.text}`}
      >
        <div>Loading user data...</div>
      </div>
    );
  }

  return (
    <div
      className={`w-full px-4 py-6 transition-colors ${th.background} ${th.text}`}
    >
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

      <div
        className={`rounded-xl shadow-md p-4 mb-6 transition-colors ${th.card}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Login Information */}
          <div className="col-span-full border-b pb-2 mb-2">
            <h2
              className={`text-lg font-medium text-gray-700 flex items-center gap-2 ${th.text}`}
            >
              <LockKeyhole className="w-5 h-5" /> {t("text.loginInformation")}
            </h2>
          </div>

          <TextField
            label={t("text.loginName")}
            value={form.LOGIN_NAME}
            placeholder={t("text.enterName", { key: t("text.loginName") })}
            onChange={(e) => handleInputChange("LOGIN_NAME", e.target.value)}
            error={errors.LOGIN_NAME}
            // @ts-ignore
            icon={<User className="w-4 h-4 text-gray-400" />}
          />
          <TextField
            label={t("text.password")}
            type="password"
            value={form.PASSWORD}
            placeholder={t("text.enterpassword")}
            onChange={(e) => handleInputChange("PASSWORD", e.target.value)}
            error={errors.PASSWORD}
            // @ts-ignore
            required
            // @ts-ignore
            icon={<LockKeyhole className="w-4 h-4 text-gray-400" />}
          />

          <TextField
            label={t("text.confirmPassword")}
            type="password"
            value={form.CONFIRM_PASSWORD}
            placeholder={t("text.confirmPassword")}
            onChange={(e) =>
              handleInputChange("CONFIRM_PASSWORD", e.target.value)
            }
            error={errors.CONFIRM_PASSWORD}
            // @ts-ignore
            required
            // @ts-ignore
            icon={<LockKeyhole className="w-4 h-4 text-gray-400" />}
          />

          <AutoCompleteSelect
            label={t("text.role")}
            options={roleOptions}
            selected={selectedRole}
            //@ts-ignore
            onChange={(opt) => handleInputChange("RANK_ID", Number(opt.value))}
            error={errors.RANK_ID}
            placeholder={t("text.select", { key: t("text.role") })}
          />

          {/* Personal Information */}
          <div className="col-span-full border-b pb-2 mb-2 mt-4">
            <h2
              className={`text-lg font-medium text-gray-700 flex items-center gap-2 ${th.text}`}
            >
              <User className="w-5 h-5" /> {t("text.personalInformation")}
            </h2>
          </div>

          <TextField
            label={t("text.firstName")}
            value={form.FIRST_NAME}
            placeholder={t("text.enterName", { key: t("text.first") })}
            onChange={(e) => handleInputChange("FIRST_NAME", e.target.value)}
            error={errors.FIRST_NAME}
            //  @ts-ignore
            required
          />

          <TextField
            label={t("text.middleName")}
            placeholder={t("text.enterName", { key: t("text.middle") })}
            value={form.MIDDLE_NAME}
            onChange={(e) => handleInputChange("MIDDLE_NAME", e.target.value)}
          />

          <TextField
            label={t("text.surname")}
            placeholder={t("text.enter", { key: t("text.surname") })}
            value={form.SUR_NAME}
            onChange={(e) => handleInputChange("SUR_NAME", e.target.value)}
          />

          <TextField
            label={t("text.userCode")}
            value={form.USER_CODE}
            placeholder={t("text.enter", { key: t("text.userCode") })}
            onChange={(e) => handleInputChange("USER_CODE", e.target.value)}
          />

          <AutoCompleteSelect
            label={t("text.gender")}
            options={genderOptions}
            selected={selectedGender}
            onChange={(opt) =>
              //@ts-ignore
              handleInputChange("GENDER_ID", Number(opt.value))
            }
            placeholder={t("text.select", { key: t("text.gender") })}
          />

          <AutoCompleteSelect
            label={t("text.userType")}
            options={userTypeOptions}
            selected={selectedUserType}
            onChange={(opt) =>
              //@ts-ignore
              handleInputChange("USER_TYPE_ID", Number(opt.value))
            }
            placeholder={t("text.select", { key: t("text.userType") })}
          />

          <DatePicker
            label={t("text.dateOfBirth")}
            selected={form.DOB || null}
            onChange={(date) => handleInputChange("DOB", date)}
          />

          <DatePicker
            label={t("text.dateOfjoining")}
            selected={form.DOJ}
            onChange={(date) => handleInputChange("DOJ", date)}
          />

          <DatePicker
            label={t("text.dateOfappointment")}
            selected={form.DOA}
            onChange={(date) => handleInputChange("DOA", date)}
          />

          {/* Contact Information */}
          <div className="col-span-full border-b pb-2 mb-2 mt-4">
            <h2
              className={`text-lg font-medium text-gray-700 flex items-center gap-2 ${th.text}`}
            >
              <Phone className="w-5 h-5" /> {t("text.contactInformation")}
            </h2>
          </div>

          <TextField
            label={t("text.mobile")}
            value={form.CUR_MOBILE}
            placeholder={t("text.enter", { key: t("text.mobileNumber") })}
            onChange={(e) => handleInputChange("CUR_MOBILE", e.target.value)}
            error={errors.CUR_MOBILE}
            // @ts-ignore
            required
            // @ts-ignore
            icon={<Phone className="w-4 h-4 text-gray-400" />}
          />

          <TextField
            label={t("text.email")}
            type="email"
            value={form.EMAIL}
            placeholder={t("text.enter", { key: t("text.email") })}
            onChange={(e) => handleInputChange("EMAIL", e.target.value)}
            error={errors.EMAIL}
            // @ts-ignore
            required
            // @ts-ignore
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
