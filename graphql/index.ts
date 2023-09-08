export const getUserQuery = `
query GetUser($email: String!){
    user(by: { email: $ email}){
        id
        name
        email
        avatarUrl
        description
        githubUrl
        linkedinUrl
    }
}
`;

export const createuserMutation = `
mutation CreateUser($input: UserCreateInput!){
    userCreate(input: $input){
        user {
          name
          email
          avatarUrl
          description
          githubUrl
          linkedinUrl
          id
        }
    }
}
`;
