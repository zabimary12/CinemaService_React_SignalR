namespace ChatService.Model
{
    public class SignUpRequest
    {
        public string Name { get; set; }
        public string Password { get; set; }
        public string PasswordConfirm { get; set; }
    }
}
