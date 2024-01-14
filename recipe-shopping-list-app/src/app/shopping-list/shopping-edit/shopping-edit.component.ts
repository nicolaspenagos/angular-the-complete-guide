import {
  Component,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Ingrdient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  addIngredient,
  deleteIngredient,
  stopEdit,
  updateIngredient,
} from '../store/shopping-list.actions';
import { selectShoppingList } from '../store/shopping-list.selectors';
import { AppState } from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) itemForm!: NgForm;
  subscription!: Subscription;
  editMode = false;
  editedItem!: Ingrdient | null;
  constructor(private store: Store<AppState>) {}

  onSubmit(itemForm: NgForm) {
    const ingName = itemForm.value['name'];
    const ingAmount = itemForm.value['amount'];
    const newIngredient = new Ingrdient(ingName, ingAmount);
    if (this.editMode) {
      this.store.dispatch(updateIngredient({ value: newIngredient }));
    } else {
      this.store.dispatch(addIngredient({ value: newIngredient }));
    }
    this.onClear();
  }

  ngOnInit(): void {
    this.subscription = this.store
      .select(selectShoppingList)
      .subscribe((stateData) => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          this.itemForm.setValue({
            name: this.editedItem!.name,
            amount: this.editedItem!.amount,
          });
        } else {
          this.editMode = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(stopEdit());
  }

  onClear() {
    this.editMode = false;
    this.itemForm.reset();
    this.store.dispatch(stopEdit());
  }

  onDelete() {
    this.store.dispatch(deleteIngredient());
    this.onClear();
  }
}
