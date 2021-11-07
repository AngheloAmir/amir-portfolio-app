/**
 * The props need to use Navbar and SlidingMenu UI
 */
export interface NavigationUIProps {
    /**
     * Path of image assets. The width and height of the image will be based on the parent element height
     */
    brandIconPath?  :string;

    /**
     * List of items that will appear in the navigation
     */
    items           :Array<NavItem>;
    
    /**
     * Called when a navigation item is clicked. It return an itemname which can be used in a switch statemet.
     * @example
     * callback={(, itemane :string) => {
     *    switch(itemname) {
     *       case 'Home': ....
     *    }
     * }
     */
    callback        :(index :number, itemname :string) => void;   
}

/**
 * An interface represent a single nav item
 */
export interface NavNameAndIcon {
    name       :string;
    icon?      :() => JSX.Element;
    active?    :boolean;
    disabled?  :boolean;
}
 
/**
 * A single nav item can have a lits of sub item (a dropdown)
 */
export interface NavItem extends NavNameAndIcon{
    subitem?   :Array<NavNameAndIcon>;
}
