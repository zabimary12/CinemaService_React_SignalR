using ChatService.Interface;
using ChatService.Model;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Dapper;
using System;
using System.Data;
using System.Data.Common;
using System.Threading.Tasks;
using System.Linq;
using BC = BCrypt.Net.BCrypt;

namespace ChatService.DAL
{
    public class AuthUser : IAuthUser
    {
        public readonly IConfiguration _configuration;

        SqlCommand _sqlCommand = null;
        public readonly SqlConnection _sqlConnection;

        public AuthUser(IConfiguration config)
        {
            _configuration = config;
        }

        public IDbConnection Connection
        {
            get
            {
                return new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            }
        }

        public async Task<SimpleResponse> SignIn(SignInRequest request) //вхід
        {
            SimpleResponse response = new SimpleResponse();
            response.IsSuccess = false;
            try
            {
                using (IDbConnection db = Connection)
                {
                    var userFromDb = db.Query<User>($"SELECT * FROM USERS WHERE Users.Name = '{request.Name}'");
                    
                    if (userFromDb.FirstOrDefault() is object && BC.Verify(request.Password, userFromDb.FirstOrDefault().Password))
                    {
                       response.IsSuccess = true;
                       response.Message = "Login Successfull";
                       return response;
                    }
                     response.Message = "Login Unsuccessfully";
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public async Task<SimpleResponse> SignUp(SignUpRequest request) //реєстрація
        {
            SimpleResponse response = new SimpleResponse();
            response.IsSuccess = false;
            try
            {

                if (!request.Password.Equals(request.PasswordConfirm))
                {
                        response.Message = "Password & Confirm Password not Match";
                        return response;
                }
                request.Password = BC.HashPassword(request.Password);

                using (IDbConnection db = Connection)
                {;
                    var userFromDb = db.Query<User>($"SELECT * FROM USERS WHERE Users.Name = '{request.Name}'");
                    if (userFromDb.FirstOrDefault() is object)
                    {
                        response.Message = "Something Went Wrong";
                        return response;
                    }
                    var newUser = db.Query<User>($"INSERT INTO Users(Name, Password) values ('{request.Name}', '{request.Password}')");
                }
                response.IsSuccess = true;
                response.Message = "Login Successfully";
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.Message;
            }
            return response;
        }
    }
}

