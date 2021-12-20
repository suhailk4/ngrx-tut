import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
// import { CounterComponent } from "./counter/counter/counter.component";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "../services/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'counter',
    loadChildren: () => import('./counter/counter.module').then(m => m.CounterModule)
  },
  {
    path: 'post',
    loadChildren: () => import('./posts/post.module').then(m => m.PostModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  // {
  //     path: 'post',
  //     component: PostslistComponent,
  //     children: [{
  //         path: 'add',
  //         component: AddpostComponent
  //   }, {
  //       path: 'edit/:id',
  //       component: EditpostComponent
  //   }],
  // }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
