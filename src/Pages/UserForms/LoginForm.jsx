import React from 'react'
import { useSelector } from 'react-redux';
import LoginFormEnglish from '../../Components/EnglishForms/LoginForm';
import LoginArabic from '../../Components/ArabicForms/Login';

const LoginForm = () => {
  const language = useSelector((state) => state.settingLanguage.language); // Access the language state

  return (
    <div>
      {language === 'en' ? (
<LoginFormEnglish /> // Render the English form component
):(
<LoginArabic /> // Render the Arabic form component
      )}
    </div>
  )
}

export default LoginForm