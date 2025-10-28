// src/pages/usermanagement/UserCreationAdd.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createUser } from "../../redux/slices/userSlice";
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
import { User, LockKeyhole, Mail, Phone } from "lucide-react";
import { Checkbox } from "@headlessui/react";
import { useTheme } from "../../contexts/ThemeContext";
import { themeClasses as tc } from "../../components/ThemeClasses";
import { IoMdRefresh } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import { FaSave } from "react-icons/fa";

interface UserForm {
  LOGIN_NAME: string;
  PASSWORD: string;
  CONFIRM_PASSWORD: string;
  RANK_ID?: number;
  SUR_NAME: string;
  FIRST_NAME: string;
  MIDDLE_NAME: string;
  SHORT_NAME: string;
  USER_CODE: string;
  DOB?: Date;
  DOA?: Date;
  DOJ?: Date;
  GENDER_ID?: number;
  CUR_PHONE: string;
  CUR_MOBILE: string;
  EMAIL: string;
  IS_ACTIVE: boolean;
  IS_SYSTEM: boolean;
  USER_TYPE_ID?: number;
  ORG_ID: string;
}

const UserCreationAdd: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.user);
  const { roles } = useAppSelector((state) => state.role);
  const { Genders } = useAppSelector((state) => state.gender);
  const { usertypes } = useAppSelector((state) => state.usertype);
  const { theme } = useTheme();
  const th = tc(theme);

  const defaultData: UserForm = {
    LOGIN_NAME: "",
    PASSWORD: "",
    CONFIRM_PASSWORD: "",
    SUR_NAME: "",
    FIRST_NAME: "",
    MIDDLE_NAME: "",
    SHORT_NAME: "",
    USER_CODE: "",
    CUR_PHONE: "",
    CUR_MOBILE: "",
    EMAIL: "",
    IS_ACTIVE: true,
    IS_SYSTEM: false,
    ORG_ID: "",
  };

  const [form, setForm] = useState<UserForm>(defaultData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchRoles());
    dispatch(fetchGenders());
    dispatch(fetchUserTypes());
  }, [dispatch]);

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

  const selectedRole = roleOptions.find((r) => r.id === form.RANK_ID) || null;
  const selectedGender =
    genderOptions.find((g) => g.id === form.GENDER_ID) || null;
  const selectedUserType =
    userTypeOptions.find((t) => t.id === form.USER_TYPE_ID) || null;

  const handleInputChange = (field: keyof UserForm, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev: any) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    // Login Information validations
    if (!form.LOGIN_NAME)
      newErrors.LOGIN_NAME = t("text.requiredName", {
        key: t("text.loginName"),
      });
    if (!form.PASSWORD)
      newErrors.PASSWORD = t("text.required", { key: t("text.password") });
    if (form.PASSWORD !== form.CONFIRM_PASSWORD) {
      newErrors.CONFIRM_PASSWORD = t("text.passwordsDoNotMatch");
    }
    if (!form.RANK_ID)
      newErrors.RANK_ID = t("text.required", { key: t("text.role") });

    // Personal Information validations
    if (!form.FIRST_NAME)
      newErrors.FIRST_NAME = t("text.required", { key: t("text.firstName") });
    // if (!form.SUR_NAME)
    //   newErrors.SUR_NAME = t("text.required", { key: t("text.surname") });

    // User Code validation (if required)
    if (!form.USER_CODE)
      newErrors.USER_CODE = t("text.required", { key: t("text.userCode") });
    else if (form.USER_CODE.length > 20)
      newErrors.USER_CODE = t("text.userCodeMustBe20CharactersOrLess");

    // Gender validation
    if (!form.GENDER_ID)
      newErrors.GENDER_ID = t("text.required", { key: t("text.gender") });

    // User Type validation
    if (!form.USER_TYPE_ID)
      newErrors.USER_TYPE_ID = t("text.required", { key: t("text.userType") });

    // Date validations
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (form.DOB) {
      const dobDate = new Date(form.DOB);
      if (dobDate > today)
        newErrors.DOB = t("text.dateOfBirthCannotBeInTheFuture");
    } else {
      newErrors.DOB = t("text.required", { key: t("text.dateOfBirth") });
    }

    if (form.DOJ) {
      const dojDate = new Date(form.DOJ);
      if (dojDate > today)
        newErrors.DOJ = t("text.dateOfJoiningCannotBeInTheFuture");
    } else {
      newErrors.DOJ = t("text.required", { key: t("text.dateOfjoining") });
    }

    if (form.DOA) {
      const doaDate = new Date(form.DOA);
      if (doaDate > today)
        newErrors.DOA = t("text.dateOfAppointmentCannotBeInTheFuture");

      if (form.DOJ && doaDate < new Date(form.DOJ)) {
        newErrors.DOA = t("text.dateOfAppointmentCannotBeBeforeDateOfJoining");
      }
    } else {
      newErrors.DOA = t("text.required", { key: t("text.dateOfappointment") });
    }

    if (!form.EMAIL)
      newErrors.EMAIL = t("text.required", { key: t("text.email") });
    else if (!/^\S+@\S+\.\S+$/.test(form.EMAIL))
      newErrors.EMAIL = t("text.invalidEmailFormat");

    if (!form.CUR_MOBILE)
      newErrors.CUR_MOBILE = t("text.required", { key: t("text.mobile") });
    else if (!/^[0-9]{10}$/.test(form.CUR_MOBILE))
      newErrors.CUR_MOBILE = t("text.invalidMobileNumber(mustbe10digits)");

    if (form.CUR_PHONE && !/^[0-9]{10,12}$/.test(form.CUR_PHONE)) {
      newErrors.CUR_PHONE = t("text.mobile");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // In UserCreationAdd.tsx, update the handleSubmit function:
  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      // Helper function to format dates
      const formatDate = (date?: Date): string | undefined => {
        if (!date) return undefined;
        // Ensure it's a Date object
        const d = new Date(date);
        return isNaN(d.getTime()) ? undefined : d.toISOString().split("T")[0];
      };

      const userData = {
        roleId: form.RANK_ID?.toString(),
        surName: form.SUR_NAME,
        firstName: form.FIRST_NAME,
        middleName: form.MIDDLE_NAME,
        shortName: form.SHORT_NAME,
        userCode: form.USER_CODE,
        dob: formatDate(form.DOB),
        doa: formatDate(form.DOA),
        doj: formatDate(form.DOJ),
        genderId: form.GENDER_ID?.toString(),
        curPhone: form.CUR_PHONE || null,
        curMobile: form.CUR_MOBILE,
        email: form.EMAIL,
        isActive: form.IS_ACTIVE,
        isDeleted: false,
        userTypeId: form.USER_TYPE_ID?.toString(),
        otp: "",
        loginName: form.LOGIN_NAME,
        password: form.PASSWORD,
        isSystem: form.IS_SYSTEM,
        orgId: form.ORG_ID,
      };
      // @ts-ignore
      await dispatch(createUser(userData)).unwrap();
      toast.success(t("text.createToast", { key: t("text.user") }));
      navigate("/usermanagement/usercreation");
    } catch (error: any) {
      toast.error(
        error.message || t("text.createErrorToast", { key: t("text.userType") })
      );
      console.error("Error details:", error);
    }
  };

  const resetForm = () => {
    setForm(defaultData);
    setErrors({});
  };
  const [isOpen, setIsOpen] = useState(false);
  const [personalTab, setPersonalTab] = useState(false);
  const [contactTab, setContactTab] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={`w-full px-4 py-6 transition-colors ${th.background} ${th.text}`}
    >
      <div className="flex items-center justify-left gap-2 mb-4">
        <button
          onClick={() => navigate("/usermanagement/usercreation")}
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <IoChevronBackCircleSharp
            className="mr-4 w-10 h-10 stroke-[2.5]"
            onClick={() => navigate("/complaintmanagement/complaintsubmission")}
          />
          {/* <RiArrowDropDownLine className="mr-4 w-10 h-10 stroke-[2.5] /> */}
        </button>
        <h1 className={`text-2xl font-bold flex items-center gap-2 ${th.text}`}>
          <User className="text-blue-700 w-8 h-10" /> {t("text.addNewUser")}
        </h1>
      </div>

      <div
        className={`rounded-xl shadow-md p-4 mb-6 transition-colors ${th.card}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Login Information */}
          <div
            className={`flex justify-between col-span-full border-b pb-2 mb-2 rounded ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-300"
            }`}
            onClick={toggleDropdown}
          >
            <div>
              <h2
                className={`text-lg font-medium text-gray-700 flex items-center gap-2 ${th.text} ml-2 mt-1`}
              >
                <LockKeyhole className="w-5 h-5" /> {t("text.loginInformation")}
              </h2>
            </div>
            <div>
              {/* <RiArrowDropDownLine className="w-10 h-10 mr-2 mt-1" /> */}
              {isOpen ? (
                <RiArrowDropUpLine className="w-8 h-8 mr-2 mt-1" />
              ) : (
                <RiArrowDropDownLine className="w-8 h-8 mr-2 mt-1" />
              )}
            </div>
          </div>

          {isOpen && (
            <>
              <TextField
                label={t("text.loginName")}
                value={form.LOGIN_NAME}
                placeholder={t("text.enterName", { key: t("text.loginName") })}
                onChange={(e) =>
                  handleInputChange("LOGIN_NAME", e.target.value)
                }
                error={errors.LOGIN_NAME}
                // @ts-ignore
                icon={<User className="w-4 h-4 text-gray-400" />}
                required
              />

              <TextField
                label={t("text.password")}
                type="password"
                value={form.PASSWORD}
                placeholder={t("text.enterpassword")}
                onChange={(e) => handleInputChange("PASSWORD", e.target.value)}
                error={errors.PASSWORD}
                // @ts-ignore
                icon={<LockKeyhole className="w-4 h-4 text-gray-400" />}
                required
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
                icon={<LockKeyhole className="w-4 h-4 text-gray-400" />}
              />

              <AutoCompleteSelect
                label={t("text.role")}
                options={roleOptions}
                selected={selectedRole}
                onChange={(opt) =>
                  // @ts-ignore
                  handleInputChange("RANK_ID", Number(opt.value))
                }
                error={errors.RANK_ID}
                placeholder={t("text.select", { key: t("text.role") })}
                required
              />

              <Checkbox
                // @ts-ignore
                label={t("text.isActive")}
                checked={form.IS_ACTIVE}
                onChange={(e: any) =>
                  handleInputChange("IS_ACTIVE", e.target.checked)
                }
              />

              <Checkbox
                // @ts-ignore
                label="Is System User"
                checked={form.IS_SYSTEM}
                onChange={(e: any) =>
                  handleInputChange("IS_SYSTEM", e.target.checked)
                }
              />
            </>
          )}

          {/* Personal Information */}
          <div
            className={`flex justify-between col-span-full border-b pb-2 mb-2 mt-4 rounded ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-300"
            }`}
            onClick={() => setPersonalTab(!personalTab)}
          >
            <div>
              <h2
                className={`text-lg font-medium text-gray-700 flex items-center gap-2 ${th.text} ml-2 mt-1`}
              >
                <User className="w-5 h-5" />
                {t("text.personalInformation")}
              </h2>
            </div>
            <div>
              {personalTab ? (
                <RiArrowDropUpLine className="w-8 h-8 mr-2 mt-1" />
              ) : (
                <RiArrowDropDownLine className="w-8 h-8 mr-2 mt-1" />
              )}
            </div>
          </div>

          {personalTab && (
            <>
              <TextField
                label={t("text.firstName")}
                value={form.FIRST_NAME}
                placeholder={t("text.enterName", { key: t("text.first") })}
                onChange={(e) =>
                  handleInputChange("FIRST_NAME", e.target.value)
                }
                error={errors.FIRST_NAME}
                // @ts-ignore
                required
              />

              <TextField
                label={t("text.middleName")}
                placeholder={t("text.enterName", { key: t("text.middle") })}
                value={form.MIDDLE_NAME}
                onChange={(e) =>
                  handleInputChange("MIDDLE_NAME", e.target.value)
                }
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
                error={errors.USER_CODE}
                // @ts-ignore
                maxLength={20} // Add this to limit input length
                // @ts-ignore
                required
              />
              <AutoCompleteSelect
                label={t("text.gender")}
                options={genderOptions}
                selected={selectedGender}
                onChange={(opt) =>
                  // @ts-ignore
                  handleInputChange("GENDER_ID", Number(opt.value))
                }
                error={errors.GENDER_ID}
                placeholder={t("text.select", { key: t("text.gender") })}
                // @ts-ignore
                required
              />

              <AutoCompleteSelect
                label={t("text.userType")}
                options={userTypeOptions}
                selected={selectedUserType}
                onChange={(opt) =>
                  // @ts-ignore

                  handleInputChange("USER_TYPE_ID", Number(opt.value))
                }
                error={errors.USER_TYPE_ID}
                placeholder={t("text.select", { key: t("text.userType") })}
                // @ts-ignore
                required
              />

              <DatePicker
                label={t("text.dateOfBirth")}
                selected={form.DOB || null}
                onChange={(date) => handleInputChange("DOB", date)}
                error={errors.DOB}
                // @ts-ignore
                required
              />

              <DatePicker
                label={t("text.dateOfjoining")}
                selected={form.DOJ}
                onChange={(date) => handleInputChange("DOJ", date)}
                error={errors.DOJ}
                // @ts-ignore
                required
              />

              <DatePicker
                label={t("text.dateOfappointment")}
                selected={form.DOA}
                onChange={(date) => handleInputChange("DOA", date)}
                error={errors.DOA}
                // @ts-ignore
                required
              />
            </>
          )}

          {/* Contact Information */}
          <div
            className={`flex justify-between col-span-full border-b pb-2 mb-2 mt-4 ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-300"
            } rounded `}
            onClick={() => setContactTab(!contactTab)}
          >
            <div>
              <h2
                className={`ml-2 mt-1 text-lg font-medium text-gray-700 flex items-center gap-2 ${th.text}`}
              >
                <Phone className="w-5 h-5" /> {t("text.contactInformation")}
              </h2>
            </div>
            <div>
              {contactTab ? (
                <RiArrowDropUpLine className="w-8 h-8 mr-2 mt-1" />
              ) : (
                <RiArrowDropDownLine className="w-8 h-8 mr-2 mt-1" />
              )}
            </div>
          </div>

          {contactTab && (
            <>
              <TextField
                label={t("text.mobile")}
                value={form.CUR_MOBILE}
                placeholder={t("text.enter", { key: t("text.mobileNumber") })}
                onChange={(e) =>
                  handleInputChange("CUR_MOBILE", e.target.value)
                }
                error={errors.CUR_MOBILE}
                // @ts-ignore
                required
                //@ts-ignore
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
                //@ts-ignore
                icon={<Mail className="w-4 h-4 text-gray-400" />}
              />
            </>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <Button
            icon={<FaSave />}
            text={t("text.save")}
            onClick={handleSubmit}
            bgColor={`${th.button.primary}`}
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

export default UserCreationAdd;
