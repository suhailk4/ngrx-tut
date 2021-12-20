import {NgModule} from "@angular/core";
import {PostslistComponent} from "./postslist/postslist.component";
import {AddpostComponent} from "./addpost/addpost.component";
import {EditpostComponent} from "./editpost/editpost.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {StoreModule} from "@ngrx/store";
import {postsReducer} from "./postslist/state/posts.reducer";
import {POST_STATE_NAME} from "./postslist/state/posts.selector";
import {EffectsModule} from "@ngrx/effects";
import {PostsEffects} from "./postslist/state/posts.effects";

const routes: Routes = [
  {
    path: '',
    component: PostslistComponent,
    children: [
      {
        path: 'add',
        component: AddpostComponent
      },
      {
        path: 'edit/:id',
        component: EditpostComponent
      }]
  }
];

@NgModule({
  declarations: [
    PostslistComponent,
    AddpostComponent,
    EditpostComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(POST_STATE_NAME, postsReducer),
    EffectsModule.forFeature([PostsEffects])
  ],
})

export class PostModule {

}
