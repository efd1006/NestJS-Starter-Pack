import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, UserRole } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/Login.dto';
import * as bcrypt from 'bcryptjs'
import { UserDTO } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ){}


  async register(registerDTO: RegisterDTO) {
    let user = await this.userRepository.findOne({where: {email: registerDTO.email}})

    if(user) {
      throw new HttpException("Email Already Exists", HttpStatus.BAD_REQUEST)
    }

    if(!UserRole[registerDTO.role]) {
      throw new HttpException("Invalid Role", HttpStatus.BAD_REQUEST)
    }

    user = await this.userRepository.create(registerDTO)
    await this.userRepository.save(user)

    return {
      message: "User has been successfully registered"
    }    
  }

  async login(loginDTO: LoginDTO) {
    let user = await this.userRepository.findOne({where: {email: loginDTO.email}})
    if(!user || !(await this.comparePassword(loginDTO.password, user.password))) {
      throw new HttpException("Invalid Credentials.", HttpStatus.BAD_REQUEST)
    }

    user = this.omit(user, ['password'])

    return {
      user
    }
  }


  async comparePassword(attempt: string, password: string) {
    return await bcrypt.compare(attempt, password)
  }

  omit(obj, props) {
    props = props instanceof Array ? props : [props];
    return eval(`(({${props.join(',')}, ...o}) => o)(obj)`);
  }

}
