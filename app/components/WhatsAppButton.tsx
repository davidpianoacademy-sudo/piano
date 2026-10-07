'use client'

export default function WhatsAppButton() {
  const phoneNumber = '380634002875' // 🇺🇦 Ukraine — format international sans +

  const message = encodeURIComponent(
    'Bonjour David Piano Academy 🎹, je souhaite avoir des informations sur vos cours.'
  )

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter sur WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5b] shadow-xl shadow-black/30 transition-transform hover:scale-110"
    >
      <svg
        viewBox="0 0 32 32"
        width="30"
        height="30"
        fill="white"
        aria-hidden="true"
      >
        <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.117.552 4.104 1.516 5.83L4 29l8.36-1.482A11.93 11.93 0 0 0 16 29c6.627 0 12-5.373 12-12S22.628 3 16.001 3zm0 21.818c-1.99 0-3.845-.583-5.404-1.588l-.387-.229-4.96.88.888-4.822-.25-.398A9.77 9.77 0 0 1 6.182 15c0-5.418 4.401-9.818 9.819-9.818 5.418 0 9.818 4.4 9.818 9.818 0 5.418-4.4 9.818-9.818 9.818zm5.386-7.348c-.295-.147-1.744-.86-2.014-.958-.27-.098-.467-.147-.663.148-.196.295-.76.958-.932 1.155-.172.196-.344.22-.638.073-.295-.147-1.244-.458-2.37-1.462-.876-.78-1.468-1.744-1.64-2.039-.172-.295-.018-.454.129-.6.132-.132.295-.344.442-.516.147-.172.196-.295.295-.492.098-.196.049-.368-.025-.516-.073-.147-.663-1.602-.908-2.193-.24-.577-.482-.497-.663-.506l-.565-.01c-.196 0-.516.073-.786.368-.27.295-1.03 1.007-1.03 2.454 0 1.447 1.055 2.846 1.202 3.042.147.196 2.076 3.168 5.032 4.443.703.303 1.252.484 1.68.62.706.224 1.349.193 1.857.117.567-.085 1.744-.714 1.99-1.404.245-.689.245-1.28.172-1.404-.073-.123-.27-.197-.565-.344z" />
      </svg>
    </a>
  )
}