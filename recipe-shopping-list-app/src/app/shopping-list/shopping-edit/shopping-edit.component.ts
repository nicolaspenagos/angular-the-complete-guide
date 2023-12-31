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
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) itemForm!: NgForm;
  subscription!: Subscription;
  editMode = false;
  editedItemIndex!: number;
  editedItem!: Ingrdient;
  constructor(private shoppingLisrService: ShoppingListService) {}

  onSubmit(itemForm: NgForm) {
    const ingName = itemForm.value['name'];
    const ingAmount = itemForm.value['amount'];
    const newIngredient = new Ingrdient(ingName, ingAmount);
    if (this.editMode) {
      this.shoppingLisrService.updateIngredient(
        this.editedItemIndex,
        newIngredient
      );
    } else {
      this.shoppingLisrService.addIngredient(newIngredient);
    }
    this.onClear();
 

  }

  ngOnInit(): void {
    this.subscription = this.shoppingLisrService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingLisrService.getIngredient(index);
        this.itemForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClear(){
    this.editMode = false;
    this.itemForm.reset();
  }

  onDelete(){
    this.shoppingLisrService.deleteIngredient(this.editedItemIndex);
  }
}
