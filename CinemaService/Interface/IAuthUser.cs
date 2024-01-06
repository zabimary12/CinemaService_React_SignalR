using ChatService.Model;
using System.Threading.Tasks;

namespace ChatService.Interface
{
    public interface IAuthUser
    {
        public Task<SimpleResponse> SignUp(SignUpRequest request);

        public Task<SimpleResponse> SignIn(SignInRequest request);
    }
}
