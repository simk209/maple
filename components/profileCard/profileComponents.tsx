import styled from "styled-components"

export default function ProfileContainer() {
  return (
    <Container>
      <Wrapper>
        <ImageContainer>
          <img src="/image/ProfilePic.png" alt="" />
        </ImageContainer>
        <ProfileName>Peter Parker</ProfileName>
        <JoinYear>Joined in 2022</JoinYear>
      </Wrapper>
    </Container>
  )
}

const Container = styled.div`
  width: 254px;
  height: 331px;
  background-color: var(--bs-blue);
  margin: 20px;
  border-radius: 20px;
  color: white;
`

const Wrapper = styled.div`
  max-width: 202px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`
const ImageContainer = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 999999px;
  margin: 0 auto;
  margin-top: 35px;
  img {
    width: 100%;
    height: 100%;
  }
`

const ProfileName = styled.span`
  font-weight: 500;
  font-size: 22px;
  line-height: 27.5px;
  text-align: center;
  margin-top: 14px;
`

const JoinYear = styled.p`
  font-weight: 500;
  margin-top: 5px;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 1.5%;
  text-align: center;
`
